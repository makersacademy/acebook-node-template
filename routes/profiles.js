const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles");

router.post("/find", ProfilesController.Find);
router.post("/image", ProfilesController.Image);
router.get("/:username", ProfilesController.Index);

module.exports = router;
