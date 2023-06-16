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

router.get("/", sessionChecker, ProfileController.Index);
router.post("/remove-friend", sessionChecker, ProfileController.RemoveFriend);
router.post("/add-friend", sessionChecker, ProfileController.AddFriend);
router.post("/accept-friend-request", sessionChecker, ProfileController.AcceptFriendRequest);


module.exports = router;
