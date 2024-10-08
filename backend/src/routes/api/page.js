var express = require("express");
var router = express.Router();

const pageController = require("../../controllers/api/page.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", authMiddleware, pageController.index);

module.exports = router;
