var express = require("express");
var router = express.Router();

const userController = require("../../controllers/api/user.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", authMiddleware, userController.index);
router.patch("/", authMiddleware, userController.update);
router.patch("/password", authMiddleware, userController.updatePassword);

module.exports = router;
