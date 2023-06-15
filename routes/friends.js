const express = require("express");
const router = express.Router();

const FriendsController = require("../controllers/friends");

router.post("/", FriendsController.Create);
router.get("/", FriendsController.Index);
router.post("/accept", FriendsController.Accept);
router.post("/reject", FriendsController.Reject);

module.exports = router;
