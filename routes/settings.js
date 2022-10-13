const express = require("express");
const router = express.Router();

const SettingsController = require("../controllers/settings");

router.get("/", SettingsController.Index);
router.post("/", SettingsController.UploadImage);

module.exports = router;
