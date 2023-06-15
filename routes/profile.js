const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profile");

// Middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

router.get("/", ProfileController.Index);
router.post("/remove-friend", ProfileController.RemoveFriend);
router.post("/add-friend", ProfileController.AddFriend);
router.post("/accept-friend-request", ProfileController.AcceptFriendRequest);


module.exports = router;