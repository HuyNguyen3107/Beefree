const { verifyToken } = require("../../utils/jwt");
const { errorResponse } = require("../../helpers/response");
const blacklistService = require("../../services/blacklist.service");
const userService = require("../../services/user.service");
const { Device } = require("../../models/index");
const UserTransformer = require("../../transformers/user.transformer");

module.exports = async (req, res, next) => {
  const accessToken = req.get("Authorization")?.split(" ").slice(-1).join();
  console.log("token", accessToken);

  if (!accessToken) {
    return errorResponse(res, 401, "Unauthorize");
  }
  const blacklist = await blacklistService.getBlacklistToken({
    token: accessToken,
  });
  if (blacklist) {
    return errorResponse(res, 401, "Unauthorize");
  }
  const decoded = verifyToken(accessToken);
  if (!decoded) {
    return errorResponse(res, 401, "Unauthorize");
  }

  const userId = decoded.userId;
  const exp = decoded.exp;

  let user = await userService.getUser({
    id: userId,
  });

  user = new UserTransformer(user.dataValues);

  if (!user || user.status === "inactive") {
    return errorResponse(res, 401, "Unauthorize");
  }
  req.user = {
    accessToken,
    exp,
    ...user,
  };
  return next();
};
