const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile")

router.get("/", ProfileController.Index);
router.get("/editProfile", ProfileController.Edit);
router.post("/updateProfile", ProfileController.Update);

module.exports = router;