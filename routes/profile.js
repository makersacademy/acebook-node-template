const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile")

router.get("/user", ProfileController.Index);
router.get("/AnotherTestUser", ProfileController.OtherUser);

module.exports = router;