var express = require("express");
var router = express.Router();
const { ServerResponse } = require("http");
const passport = require("passport");
const authController = require("../../controllers/api/auth.controller");
const userService = require("../../services/user.service");
const providerService = require("../../services/provider.service");
const userTokenService = require("../../services/userToken.service");
// const randomCode = require("../../helpers/random2FA");
const responses = require("../../helpers/response");
const sendMail = require("../../utils/mail");

const authMiddleware = require("../../middlewares/api/auth.middleware");
const {createAccessToken, createRefreshToken} = require("../../utils/jwt");
const UserTransformer = require("../../transformers/user.transformer");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authMiddleware, authController.logout);
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
      const user = await userService.getUser({ email: data.email });
      const provider = await providerService.getProvider({name: data.provider.toLocaleLowerCase()});
      const temp = data.name.split(" ");
      if (!user) {
        if (provider) {
          await userService.createUser({
            first_name: temp.slice(0, -1).join(" "),
            last_name: temp.slice(-1).join(""),
            email: data.email,
            password: null,
            avatar: data?.thumbnail,
            status: "active",
            provider_id: provider.id,
          });
        } else {
          const googleProvider = await providerService.createProvider({
            name: data.provider,
          });
          await userService.createUser({
            first_name: temp.slice(0, -1).join(" "),
            last_name: temp.slice(-1).join(""),
            email: data.email,
            password: null,
            avatar: data?.thumbnail,
            status: "active",
            provider_id: googleProvider.id,
          });
        }
      } else {
        if (provider) {
          await userService.updateUser(
            {
              first_name: temp.slice(0, -1).join(" "),
              last_name: temp.slice(-1).join(""),
              provider_id: provider.id,
              avatar: data?.thumbnail,
            },
            {
              email: data.email,
            }
          );
        } else {
          const googleProvider = await providerService.createProvider({
            name: data.provider,
          });
          await userService.updateUser(
            {
              first_name: temp.slice(0, -1).join(" "),
              last_name: temp.slice(-1).join(""),
              provider_id: googleProvider.id,
              avatar: data?.thumbnail,
            },
            {
              email: data.email,
            }
          );
        }
      }
      const info = await userService.getUser({ email: data.email });
      const accessToken = createAccessToken({
        userId: info.id,
        userFirstName: info.first_name,
        userLastName: info.last_name,
        userEmail: info.email,
      });
      const refreshToken = createRefreshToken();
      await userTokenService.addUserToken({
        refresh_token: refreshToken,
        user_id: info.id,
      })
      await userService.updateUser(
          { access_token: accessToken },
          { email: info.email }
      );
      return responses.successResponse(res, 200, "Login success", new UserTransformer(info), {
        accessToken,
        refreshToken,
      })
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
      const user = await userService.getUser({ email: data.email });
      const provider = await providerService.getProvider({name: data.provider.toLocaleLowerCase()});
      const temp = data.name.split(" ");
      if (!user) {
        if (provider) {
          await userService.createUser({
            first_name: temp.slice(0, -1).join(" "),
            last_name: temp.slice(-1).join(""),
            email: data.email,
            password: null,
            avatar: data?.thumbnail,
            status: "active",
            provider_id: provider.id,
          });
        } else {
          const githubProvider = await providerService.createProvider({
            name: data.provider,
          });
          await userService.createUser({
            first_name: temp.slice(0, -1).join(" "),
            last_name: temp.slice(-1).join(""),
            email: data.email,
            password: null,
            avatar: data?.thumbnail,
            status: "active",
            provider_id: githubProvider.id,
          });
        }
      } else {
        if (provider) {
          await userService.updateUser(
              {
                first_name: temp.slice(0, -1).join(" "),
                last_name: temp.slice(-1).join(""),
                provider_id: provider.id,
                avatar: data?.thumbnail,
              },
              {
                email: data.email,
              }
          );
        } else {
          const githubProvider = await providerService.createProvider({
            name: data.provider,
          });
          await userService.updateUser(
              {
                first_name: temp.slice(0, -1).join(" "),
                last_name: temp.slice(-1).join(""),
                provider_id: githubProvider.id,
                avatar: data?.thumbnail,
              },
              {
                email: data.email,
              }
          );
        }
      }
      const info = await userService.getUser({ email: data.email });
      const accessToken = createAccessToken({
        userId: info.id,
        userFirstName: info.first_name,
        userLastName: info.last_name,
        userEmail: info.email,
      });
      const refreshToken = createRefreshToken();
      await userTokenService.addUserToken({
        refresh_token: refreshToken,
        user_id: info.id,
      })
      await userService.updateUser(
          { access_token: accessToken },
          { email: info.email }
      );
      return responses.successResponse(res, 200, "Login success", new UserTransformer(info), {
        accessToken,
        refreshToken,
      })
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  }
);

module.exports = router;
