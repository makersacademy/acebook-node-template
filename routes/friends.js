const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post(
  "/requests/:friendUsername/:currentUsername",
  FriendsController.Create
);

module.exports = router;
