const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.js");

router.get("/", ProfileController.Profile);

//router.get("/viewperson/:id", UserController.Viewfriend);

module.exports = router;
