var express = require("express");
var router = express.Router();

const pageController = require("../../controllers/api/page.controller");
const authMiddleware = require("../../middlewares/api/auth.middleware");

router.get("/", pageController.index);
router.get("/:id", pageController.find);
router.post("/", pageController.create);
router.patch("/:id", pageController.update);
router.delete("/:id", pageController.delete);
router.delete("/", pageController.deleteAll);

module.exports = router;
