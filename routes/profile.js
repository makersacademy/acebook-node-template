const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile")

router.get("/user/:username", ProfileController.Index);
router.post('/', ProfileController.OtherUser);

module.exports = router;