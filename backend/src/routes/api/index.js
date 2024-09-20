var express = require("express");
var router = express.Router();

// Import and use the auth route
const auth = require("./auth");
router.use("/auth", auth);

module.exports = router;
