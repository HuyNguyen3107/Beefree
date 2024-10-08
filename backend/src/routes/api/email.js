var express = require("express");
var router = express.Router();

const emailController = require("../../controllers/api/email.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", authMiddleware, emailController.index);

module.exports = router;
