const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.js");

router.get("/", ProfileController.Profile);
router.get("/viewperson/:id", ProfileController.ViewPerson);
router.get("/userlist", ProfileController.UserList);
router.get("/friendlist", ProfileController.FriendList);
router.post("/acceptfriend/:id", ProfileController.Acceptfriend);
router.post("/rejectfriend/:id", ProfileController.Rejectfriend);

module.exports = router;
