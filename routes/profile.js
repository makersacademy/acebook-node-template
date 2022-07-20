const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/:userId", ProfileController.Index);

module.exports = router;