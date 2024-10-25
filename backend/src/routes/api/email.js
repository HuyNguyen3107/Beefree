var express = require("express");
var router = express.Router();

const emailController = require("../../controllers/api/email.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", authMiddleware, emailController.index);
router.get("/:id", authMiddleware, emailController.find);
router.post("/", authMiddleware, emailController.create);
router.patch("/:id", authMiddleware, emailController.update);
router.delete("/:id", authMiddleware, emailController.delete);
router.delete("/", authMiddleware, emailController.deleteAll);

module.exports = router;
