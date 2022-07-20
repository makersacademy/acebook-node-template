const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.Index);

module.exports = router;