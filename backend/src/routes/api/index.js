var express = require("express");
var router = express.Router();

// Import and use the auth route
const auth = require("./auth");
const user = require("./user");
const email = require("./email");
const page = require("./page");
const send = require("./send");
router.use("/auth", auth);
router.use("/user", user);
router.use("/email", email);
router.use("/page", page);
router.use("/send", send)

module.exports = router;
