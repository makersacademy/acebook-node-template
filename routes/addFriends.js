const express = require("express");
const router = express.Router();
const addFriendsController = require("../controllers/addFriends");

router.get("/", addFriendsController.Search);

module.exports = router;