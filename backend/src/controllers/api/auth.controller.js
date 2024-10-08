const bcrypt = require("bcrypt");
const { string } = require("yup");
const userService = require("../../services/user.service");
const providerService = require("../../services/provider.service");
const userTokenService = require("../../services/userToken.service");
const blacklistService = require("../../services/blacklist.service");
const passwordTokenService = require("../../services/passwordToken.service");
const responses = require("../../helpers/response");
const sendMail = require("../../utils/mail");
const UserTransformer = require("../../transformers/user.transformer");

const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../../utils/jwt");

const md5 = require("md5");

module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return responses.errorResponse(
        res,
        400,
        "Bad Request",
        "Vui lòng nhập đầy đủ các trường"
      );
    } else {
      const user = await userService.getUser({
        email: email,
      });
      const provider = await providerService.getProvider({
        name: "email",
      });
      if (!user) {
        return responses.errorResponse(
          res,
          400,
          "Bad Request",
          "Email hoặc mật khẩu không chính xác"
        );
      } else {
        if (user.provider_id !== provider.id) {
          return responses.errorResponse(
            res,
            400,
            "Bad Request",
            "Tài khoản này đã được liên kết với mạng xã hội"
          );
        }
        const { password: hash } = user;
        const result = bcrypt.compareSync(password, hash);
        if (!result) {
          return responses.errorResponse(
            res,
            400,
            "Bad Request",
            "Email hoặc mật khẩu không chính xác"
          );
        } else {
          const accessToken = createAccessToken({
            userId: user.id,
            userFirstName: user.first_name,
            userLastName: user.last_name,
            userEmail: user.email,
          });
          const refreshToken = createRefreshToken();
          await userTokenService.addUserToken({
            refresh_token: refreshToken,
            user_id: user.id,
          });
          if (!accessToken || !refreshToken) {
            return responses.errorResponse(res, 500, "Server Error");
          }
          const response = await userService.updateUser(
            { access_token: accessToken },
            { email: email }
          );
          if (!response) {
            return responses.errorResponse(res, 500, "Server Error");
          }
          return responses.successResponse(
            res,
            200,
            "Login success",
            new UserTransformer(user),
            {
              accessToken,
              refreshToken,
            }
          );
        }
      }
    }
  },
  register: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password || !lastName) {
      return responses.errorResponse(
        res,
        400,
        "Bad Request",
        "Vui lòng nhập đầy đủ các trường"
      );
    } else {
      const rule = {
        firstName: string()
          .min(5, "Tên phải từ năm ký tự")
          .required("Tên bắt buộc phải nhập"),
        lastName: string()
          .min(3, "Tên phải từ năm ký tự")
          .required("Tên bắt buộc phải nhập"),
        email: string()
          .required("Email bắt buộc phải nhập")
          .email("Email không đúng định dạng")
          .test("validate-emailExist", "Email đã tồn tại", async (value) => {
            if (!value) {
              return true;
            }
            const user = await userService.getUser({
              email: value,
            });
            if (user) {
              return false;
            }
            return true;
          }),
        password: string()
          .test(
            "validate-password",
            "Tối thiểu tám ký tự, ít nhất một chữ cái và một số:))",
            (value) => {
              const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
              return pattern.test(value);
            }
          )
          .required("Mật khẩu bắt buộc phải nhập"),
      };

      const body = await req.validate(req.body, rule);
      if (body) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        body.password = hashPassword;
        const provider = await providerService.getProvider({
          name: "email",
        });
        if (provider) {
          await userService.createUser({
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            password: body.password,
            status: "active",
            provider_id: provider.id,
          });
        } else {
          const emailProvider = await providerService.createProvider({
            name: "email",
          });
          await userService.createUser({
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            password: body.password,
            status: "active",
            provider_id: emailProvider.id,
          });
        }
        return responses.successResponse(res, 200, "Success");
      } else {
        const error = {
          ...req.errors,
        };
        return responses.errorResponse(res, 400, "Bad Request", error);
      }
    }
  },
  logout: async (req, res, next) => {
    const { accessToken, exp } = req.user;
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return responses.errorResponse(res, 400, "Bad Request");
    }

    const blacklist = await blacklistService.createBlacklistToken({
      token: accessToken,
      expired: exp,
    });

    if (!blacklist) {
      return responses.errorResponse(res, 500, "Server Error");
    }

    const userToken = await userTokenService.deleteUserToken({
      refresh_token: refreshToken,
      user_id: req.user.id,
    });

    if (!userToken) {
      return responses.errorResponse(res, 500, "Server Error");
    }

    return responses.successResponse(res, 200, "Logout success");
  },
  refresh: async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return responses.errorResponse(res, 400, "Bad Request");
    }

    const userToken = await userTokenService.getUserToken({
      refresh_token: refreshToken,
    });

    if (!userToken) {
      return responses.errorResponse(res, 401, "Unauthorize");
    }

    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      await userTokenService.deleteUserToken({
        refresh_token: refreshToken,
      });
      return responses.errorResponse(res, 401, "Unauthorize");
    }

    const user = await userService.getUser({
      id: userToken.dataValues.user_id,
    });

    const isRevokeToken = await userTokenService.deleteUserToken({
      refresh_token: refreshToken,
    });

    if (!isRevokeToken) {
      return responses.errorResponse(res, 500, "Server Error");
    }

    const newAccessToken = createAccessToken({
      userId: user.id,
      userFirstName: user.first_name,
      userLastName: user.last_name,
      userEmail: user.email,
    });

    const newRefreshToken = createRefreshToken();

    if (!newAccessToken || !newRefreshToken) {
      return responses.errorResponse(res, 500, "Server Error");
    }

    const isCreateToken = await userTokenService.addUserToken({
      refresh_token: newRefreshToken,
      user_id: user.id,
    });

    if (!isCreateToken) {
      return responses.errorResponse(res, 500, "Server Error");
    }

    return responses.successResponse(
      res,
      200,
      "Success",
      new UserTransformer(user),
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    );
  },
  forgotPassword: async (req, res, next) => {
    const user = await userService.getUser({
      email: req.body.email,
    });

    if (!user) {
      return responses.errorResponse(res, 400, "Email not exist");
    }

    const reset_token = md5(Math.random() + new Date().getTime());
    const milliseconds = new Date().getTime();

    const passwordToken = await passwordTokenService.addPasswordToken({
      reset_token,
      expired: `${milliseconds + 60000}`,
      user_id: user.id,
    });

    if (!passwordToken) {
      return responses.errorResponse(res, 500, "Server Error");
    }

    const subject = `Reset your password`;
    const message = `<a href="http://localhost:3001/app/reset-password/user_id-${user.id}/reset_token-${reset_token}">Click here to reset your password</a>`;
    const info = await sendMail(req.body.email, subject, message);
    console.log(info);

    if (info.success) {
      return responses.successResponse(res, 200, "Success");
    } else {
      return responses.errorResponse(res, 500, "Can't send email");
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { _user_id: user_id, _reset_token: reset_token } = req.query;

      const passwordToken = await passwordTokenService.getPasswordToken({
        user_id: user_id,
        reset_token: reset_token,
      });

      if (!passwordToken) {
        return responses.errorResponse(res, 400, "Token not exist");
      }

      const currentMilliseconds = new Date().getTime();
      const expiredTokenMilliseconds = passwordToken.expired;
      if (+currentMilliseconds >= +expiredTokenMilliseconds) {
        const response = await passwordTokenService.deletePasswordToken({
          user_id: user_id,
          reset_token: reset_token,
        });
        if (!response) {
          return responses.errorResponse(res, 500, "Server Error");
        }
        return responses.errorResponse(res, 400, "Token has expired");
      }
      return responses.successResponse(res, 200, "Success");
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  handleResetPassword: async (req, res, next) => {
    const { _email: email, _reset_token: reset_token } = req.query;
    const rule = {
      password: string()
        .test(
          "validate-password",
          "Tối thiểu tám ký tự, ít nhất một chữ cái và một số:))",
          (value) => {
            const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return pattern.test(value);
          }
        )
        .required("Mật khẩu bắt buộc phải nhập"),
      passwordRetype: string()
        .test(
          "validate-password",
          "Mật khẩu nhập lại không chính xác",
          (value) => {
            if (value === req.body.password) {
              return true;
            }
            return false;
          }
        )
        .required("Mật khẩu bắt buộc phải nhập lại"),
    };
    const body = await req.validate(req.body, rule);
    if (body) {
      try {
        const passwordToken = await passwordTokenService.getPasswordToken({
          reset_token: reset_token,
        });
        const currentMilliseconds = new Date().getTime();
        const expiredTokenMilliseconds = passwordToken.expired;

        if (+currentMilliseconds >= +expiredTokenMilliseconds) {
          const response = await passwordTokenService.deletePasswordToken({
            reset_token: reset_token,
          });
          if (!response) {
            return responses.errorResponse(res, 500, "Server Error");
          }
          return responses.errorResponse(res, 400, "Token has expired");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        const user = userService.updateUser(
          { password: hashPassword },
          { email: email }
        );
        if (!user) {
          return responses.errorResponse(res, 500, "Server Error");
        }
        const isDeleteToken = await passwordTokenService.deletePasswordToken({
          user_id: user.id,
          reset_token: reset_token,
        });
        if (!isDeleteToken) {
          return responses.errorResponse(res, 500, "Server Error");
        }

        const subject = `Reset password success`;
        const message = `
          <a href="http://localhost:3001/app/login">Congratulations, you have successfully changed your password. Log in now!</a>
          `;
        const info = await sendMail(email, subject, message);
        if (!info) {
          return responses.errorResponse(res, 500, "Server Error");
        }
        return responses.successResponse(res, 200, "Success");
      } catch (e) {
        return responses.errorResponse(res, 500, "Server Error");
      }
    } else {
      return responses.errorResponse(res, 400, "Bad request");
    }
  },
};
