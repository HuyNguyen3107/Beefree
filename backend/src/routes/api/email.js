var express = require("express");
var router = express.Router();

const emailController = require("../../controllers/api/email.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", emailController.index);
router.get("/:id", emailController.find);
router.post("/", emailController.create);
router.patch("/:id", emailController.update);
router.delete("/:id", emailController.delete);
router.delete("/", emailController.deleteAll);

module.exports = router;
