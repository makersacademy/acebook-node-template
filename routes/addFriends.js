const express = require("express");
const router = express.Router();
const addFriendsController = require("../controllers/addFriends");

router.get("/", addFriendsController.Search);
router.post("/send", addFriendsController.Send);
router.post("/cancel", addFriendsController.Cancel);
router.post("/accept", addFriendsController.Accept);
router.post("/decline", addFriendsController.Decline);

module.exports = router;
