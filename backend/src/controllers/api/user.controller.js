const responses = require("../../helpers/response");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { object, string } = require("yup");
const userService = require("../../services/user.service");
const UserTransformer = require("../../transformers/user.transformer");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      const accessToken = authorization.split(" ")[1];
      console.log("token", accessToken);

      const user = await userService.getUser({
        access_token: accessToken,
      });

      return responses.successResponse(
        res,
        200,
        "Success",
        new UserTransformer(user)
      );
    } catch (error) {
      console.log(error);

      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  update: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const { firstName, lastName } = req.body;
      const accessToken = authorization.split(" ")[1];
      await userService.updateUser(
        {
          first_name: firstName,
          last_name: lastName,
        },
        {
          access_token: accessToken,
        }
      );
      return responses.successResponse(res, 200, "Success");
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const { currentPassword, newPassword, retypePassword } = req.body;
      const accessToken = authorization.split(" ")[1];
      const rule = {
        newPassword: string()
          .test(
            "validate-password",
            "Tối thiểu tám ký tự, ít nhất một chữ cái và một số:))",
            (value) => {
              const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
              return pattern.test(value);
            }
          )
          .required("Mật khẩu bắt buộc phải nhập"),
        retypePassword: string()
          .test(
            "validate-password",
            "Mật khẩu nhập lại không chính xác",
            (value) => {
              if (value === req.body.newPassword) {
                return true;
              }
              return false;
            }
          )
          .required("Mật khẩu bắt buộc phải nhập lại"),
      };
      const body = await req.validate(req.body, rule);
      if (body) {
        const user = await userService.getUser({
          access_token: accessToken,
        });

        const { password: hashedPassword } = user;
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (!isMatch) {
          return responses.errorResponse(res, 400, "Current password is wrong");
        }
        if (newPassword !== retypePassword) {
          return responses.errorResponse(
            res,
            400,
            "New password and retype password is not match"
          );
        }
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        await userService.updateUser(
          {
            password: hashedNewPassword,
          },
          {
            access_token: accessToken,
          }
        );

        return responses.successResponse(res, 200, "Success");
      } else {
        return responses.errorResponse(res, 400, "Bad Request");
      }
    } catch (error) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
};
