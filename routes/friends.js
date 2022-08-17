const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post("/", FriendsController.Add);
router.post("/accept/:id", FriendsController.Accept);
router.get("/", FriendsController.Index);
router.get("/search", FriendsController.Search);
module.exports = router;
