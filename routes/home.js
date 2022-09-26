const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/home");

router.get("/", HomeController.Index);
router.get("/signinerror", HomeController.Error);
router.get("/signuperror", HomeController.SignupError);


module.exports = router;
