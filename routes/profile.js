const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile.js");

router.get("/", ProfileController.Profile);
router.post("/viewperson/:id", ProfileController.ViewPerson);
router.get("/userlist", ProfileController.UserList);
router.get("/friendlist", ProfileController.FriendList);

module.exports = router;
