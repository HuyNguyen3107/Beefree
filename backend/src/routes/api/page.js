var express = require("express");
var router = express.Router();

const pageController = require("../../controllers/api/page.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", authMiddleware, pageController.index);
router.get("/:id", authMiddleware, pageController.find);
router.post("/", authMiddleware, pageController.create);
router.patch("/:id", authMiddleware, pageController.update);
router.delete("/:id", authMiddleware, pageController.delete);
router.delete("/", authMiddleware, pageController.deleteAll);

module.exports = router;
