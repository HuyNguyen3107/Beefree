const bcrypt = require("bcrypt");
const md5 = require("md5");
const { string } = require("yup");
const userService = require("../../services/user.service");
const providerService = require("../../services/provider.service");
const deviceService = require("../../services/device.service");
const userTokenService = require("../../services/userToken.service");
const blacklistService = require("../../services/blacklist.service");
const responses = require("../../helpers/response");
const sendMail = require("../../utils/mail");
const randomCode = require("../../helpers/random2FA");
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();
const { Device } = require("../../models/index");
const { where } = require("sequelize");
const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../../utils/jwt");

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
      const user = await userService.findOne({
        email: email,
      });
      const provider = await providerService.findOne("email");
      if (user.provider_id !== provider.id) {
        return responses.errorResponse(
          res,
          400,
          "Bad Request",
          "Tài khoản này đã được liên kết với mạng xã hội"
        );
      }
      if (!user) {
        return responses.errorResponse(
          res,
          400,
          "Bad Request",
          "Email hoặc mật khẩu không chính xác"
        );
      } else {
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
          const verifyCode = randomCode();
          const subject = `Here is your verify code`;
          const message = `<h3>${verifyCode}</h3>`;
          const check2FA = await sendMail(email, subject, message);
          if (check2FA) {
            req.flash("userEmail", email);
            req.flash("verifyCode", verifyCode);
            return responses.successResponse(res, 200, "Send email success");
          }
        }
      }
    }
  },
  register: async (req, res, next) => {
    const { name, email, password, password_retype } = req.body;
    if (!name || !email || !password || !password_retype) {
      return responses.errorResponse(
        res,
        400,
        "Bad Request",
        "Vui lòng nhập đầy đủ các trường"
      );
    } else {
      const rule = {
        name: string()
          .min(5, "Tên phải từ năm ký tự")
          .required("Tên bắt buộc phải nhập"),
        email: string()
          .required("Email bắt buộc phải nhập")
          .email("Email không đúng định dạng")
          .test("validate-emailExist", "Email đã tồn tại", async (value) => {
            if (!value) {
              return true;
            }
            const user = await userService.findOne({
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
        password_retype: string()
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
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        body.password = hashPassword;
        const provider = await providerService.findOne("email");
        if (provider) {
          await userService.add(
            body.name,
            body.email,
            body.password,
            provider.id
          );
        } else {
          const emailProvider = await providerService.add("email");
          await userService.add(
            body.name,
            body.email,
            body.password,
            emailProvider.id
          );
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
  verify: async (req, res, next) => {
    const { code } = req.body;
    const userEmail = req.flash("userEmail");
    const verifyCode = req.flash("verifyCode");
    if (code === verifyCode[0]) {
      const user = await userService.findOne(
        {
          email: userEmail[0],
        },
        {
          model: Device,
          as: "devices",
        }
      );
      const userAgent = req.get("user-agent");
      const device = deviceDetector.parse(userAgent);
      const checkDevice = user.devices.find((device) => {
        // return device.user_agent === req.get("user-agent");
        return (
          device.user_agent ===
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );
      });
      if (checkDevice) {
        const devicesId = user.devices.map((device) => device.id);
        devicesId.forEach(async (id) => {
          if (id === checkDevice.id) {
            await deviceService.update(
              {
                status: true,
              },
              {
                id,
              }
            );
          } else {
            await deviceService.update(
              {
                status: false,
              },
              {
                id,
              }
            );
          }
        });
      } else {
        const devicesId = user.devices.map((device) => device.id);
        devicesId.forEach(async (id) => {
          await deviceService.update(
            {
              status: false,
            },
            {
              id,
            }
          );
        });
        // const deviceInstance = await deviceService.add(
        //   device.client.name,
        //   device.os.name,
        //   device.device.type,
        //   true,
        //   req.get("user-agent")
        // );
        const deviceInstance = await deviceService.add(
          "Chrome",
          "Windows",
          "desktop",
          true,
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        );
        await user.addDevices(deviceInstance);
      }
      const accessToken = createAccessToken({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      });
      const refreshToken = createRefreshToken();
      await userTokenService.add(refreshToken, user.id);
      if (!accessToken) {
        return responses.errorResponse(res, 500, "Server Error");
      }
      return responses.successResponse(res, 200, "Verify success", {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      });
    } else {
      return responses.errorResponse(res, 400, "Bad Request");
    }
  },
  logout: async (req, res, next) => {
    const { accessToken, exp } = req.user;
    const blacklist = await blacklistService.findOrCreate(
      { token: accessToken },
      { token: accessToken, expired: exp }
    );
    if (blacklist) {
      return responses.successResponse(res, 200, "Success");
    }
    return responses.errorResponse(res, 500, "Server Error");
  },
  refresh: async (req, res, next) => {
    //Input: Refresh Token (Body)
    const refreshToken = req.body.refresh_token;
    const userToken = await userTokenService.findOne({
      refresh_token: refreshToken,
    });
    if (!userToken) {
      return responses.errorResponse(res, 400, "Bad Request");
    }
    //Nếu tồn tại trong Database --> Lấy userId
    const { user_id: userId } = userToken;

    const user = await userService.findOne({
      id: userId,
    });

    if (!user) {
      return responses.errorResponse(res, 401, "Unauthorize");
    }
    //Verify Token --> Kiểm tra hết hạn
    const decoded = verifyToken(refreshToken);
    if (!decoded) {
      return responses.errorResponse(res, 401, "Unauthorize");
    }
    //Khởi tạo accessToken mới
    const accessToken = createAccessToken({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    });

    //Trả về response
    if (!accessToken) {
      return responses.errorResponse(res, 500, "Server Error");
    }
    return responses.successResponse(res, 200, "Success", {
      accessToken,
      refreshToken,
    });
  },
  forgotPassword: async (req, res, next) => {
    const user = await userTokenService.findOne({
      email: req.body.email,
    });
    if (user) {
      const reset_token = md5(Math.random() + new Date().getTime());
      const milliseconds = new Date().getTime() + 900000;
      const time = new Date(milliseconds);
      const expired_token = `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}(${time})`;
      await userService.update(
        {
          reset_token,
          expired_token,
        },
        {
          email: req.body.email,
        }
      );
      const subject = `Reset your password`;
      const message = `<a href="https://google-seven-gamma.vercel.app/auth/reset-password?email=${req.body.email}&reset_token=${reset_token}" class="btn btn-danger mt-2 w-100">Click here to reset your password</a>`;
      const info = await sendMail(req.body.email, subject, message);
      if (info) {
        return responses.successResponse(res, 200, "Send email success");
      }
    } else {
      return responses.errorResponse(res, 400, "Email not exist");
    }
  },
  resetPassword: async (req, res, next) => {
    const { email, reset_token } = req.query;
    let user;
    try {
      user = await userService.findOne({
        email: email,
      });
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
    if (user.reset_token !== reset_token) {
      return responses.errorResponse(res, 400, "Token not exist");
    }
    const expired_time = user.expired_token.slice(
      user.expired_token.indexOf("(") + 1,
      user.expired_token.lastIndexOf("(") - 1
    );
    const currentMilliseconds = new Date().getTime();
    const expiredTokenMilliseconds = new Date(expired_time);
    if (currentMilliseconds >= expiredTokenMilliseconds.getTime()) {
      return responses.errorResponse(res, 400, "Token has expired");
    }
    return responses.successResponse(res, 200, "Success");
  },
  handleResetPassword: async (req, res, next) => {
    const { email, reset_token } = req.query;
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
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        await userService.update(
          {
            password: hashPassword,
            reset_token: null,
            expired_token: null,
          },
          {
            email: email,
          }
        );
        const subject = `Reset password success`;
        const message = `
          <a href="https://google-seven-gamma.vercel.app/auth/login" class="btn btn-danger mt-2 w-100">Congratulations, you have successfully changed your password. Log in now!</a>
          `;
        const info = await sendMail(email, subject, message);
        return responses.successResponse(res, 200, "Send email success");
      } catch (e) {
        return responses.errorResponse(res, 500, "Server Error");
      }
    } else {
      return responses.errorResponse(res, 400, "Bad request");
    }
  },
};
