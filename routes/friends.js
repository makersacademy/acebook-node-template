const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.get("/", FriendsController.New);
router.post("/new", FriendsController.List);
router.post("/request", FriendsController.Add);

module.exports = router;
