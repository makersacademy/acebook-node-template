const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post("/search", FriendsController.Search);
router.post("/request", FriendsController.Request);

module.exports = router;