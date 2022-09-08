const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.put("/requests/new/:friendUsername", FriendsController.Create);

module.exports = router;
