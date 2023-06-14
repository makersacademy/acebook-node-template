const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

router.get("/", ProfileController.Index);
router.post("/remove-friend", ProfileController.RemoveFriend);
router.post("/add-friend", ProfileController.AddFriend);

module.exports = router;