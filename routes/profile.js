const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.js");

router.get("/", ProfileController.Profile);

module.exports = router;
