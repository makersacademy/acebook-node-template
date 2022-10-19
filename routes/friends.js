const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post("/accept", FriendsController.Accept);
router.post("/decline", FriendsController.Decline);

module.exports = router;
