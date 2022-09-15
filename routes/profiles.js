const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");

router.get("/", ProfilesController.LoadFromProfileButton);
router.post("/", ProfilesController.Index);
router.get("/:username", ProfilesController.Index);

module.exports = router;
