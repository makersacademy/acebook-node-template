const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/home");

router.get("/", HomeController.MyProfile);
router.get("/myprofile", HomeController.MyProfile);

module.exports = router;
