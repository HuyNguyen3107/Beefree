var express = require("express");
var router = express.Router();

const sendController = require("../../controllers/api/send.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.post("/", sendController.index);

module.exports = router;