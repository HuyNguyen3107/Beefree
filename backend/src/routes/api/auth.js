var express = require("express");
var router = express.Router();
const { ServerResponse } = require("http");
const passport = require("passport");
const authController = require("../../controllers/api/auth.controller");
const userService = require("../../services/user.service");
const providerService = require("../../services/provider.service");
const randomCode = require("../../helpers/random2FA");
const responses = require("../../helpers/response");
const sendMail = require("../../utils/mail");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/verify", authController.verify);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password", authController.resetPassword);
router.post("/reset-password", authController.handleResetPassword);

router.get("/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);
  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
    },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");
  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    try {
      // Lấy data user
      const data = req.user;
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Bad request",
        });
      }

      // Nếu email đã có tài khoản thì đăng nhập tài khoản đó, nếu email chưa có tài khoản thì tạo tài khoản mới với email đó
      const user = await userService.findOne({ email: data.email });
      const provider = await providerService.findOne(data.provider);

      if (user.provider_id !== provider.id) {
        return res.status(400).json({
          status: 400,
          message: "Tài khoản không được liên kết với mạng xã hội này",
        });
      }
      if (!user) {
        if (provider) {
          await userService.add(data.name, data.email, null, provider.id);
        } else {
          const googleProvider = await providerService.add(data.provider);
          await userService.add(data.name, data.email, null, googleProvider.id);
        }
      } else {
        if (provider) {
          await userService.update(
            {
              name: data.name,
              provider_id: provider.id,
            },
            {
              email: data.email,
            }
          );
        } else {
          const googleProvider = await providerService.add(data.provider);
          await userService.update(
            {
              name: data.name,
              provider_id: googleProvider.id,
            },
            {
              email: data.email,
            }
          );
        }
      }

      const verifyCode = randomCode();
      const subject = `Here is your verify code`;
      const message = `<h3>${verifyCode}</h3>`;
      const check2FA = await sendMail(data.email, subject, message);
      if (check2FA) {
        req.flash("userEmail", data.email);
        req.flash("verifyCode", verifyCode);
        return responses.successResponse(res, 200, "Send email success");
      }
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  }
);

router.get("/github", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");

  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  async (req, res) => {
    // Lấy data user
    try {
      const data = req.user;
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Bad request",
        });
      }

      // Nếu email đã có tài khoản thì đăng nhập tài khoản đó, nếu email chưa có tài khoản thì tạo tài khoản mới với email đó
      const user = await userService.findOne({ email: data.email });
      const provider = await providerService.findOne(data.provider);
      if (user.provider_id !== provider.id) {
        return res.status(400).json({
          status: 400,
          message: "Tài khoản không được liên kết với mạng xã hội này",
        });
      }
      if (!user) {
        if (provider) {
          await userService.add(data.name, data.email, null, provider.id);
        } else {
          const githubProvider = await providerService.add(data.provider);
          await userService.add(data.name, data.email, null, githubProvider.id);
        }
      } else {
        if (provider) {
          await userService.update(
            {
              name: data.name,
              provider_id: provider.id,
            },
            {
              email: data.email,
            }
          );
        } else {
          const githubProvider = await providerService.add(data.provider);
          await userService.update(
            {
              name: data.name,
              provider_id: githubProvider.id,
            },
            {
              email: data.email,
            }
          );
        }
      }

      const verifyCode = randomCode();
      const subject = `Here is your verify code`;
      const message = `<h3>${verifyCode}</h3>`;
      const check2FA = await sendMail(data.email, subject, message);
      if (check2FA) {
        req.flash("userEmail", data.email);
        req.flash("verifyCode", verifyCode);
        return responses.successResponse(res, 200, "Send email success");
      }
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  }
);

module.exports = router;
