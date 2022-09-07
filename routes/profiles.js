const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");

router.get("/:username", ProfilesController.Index);

module.exports = router;
