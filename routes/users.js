const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (!req.session.user && !req.cookies.user_sid) {
    res.redirect("/sessions/new");
  } else {
    next();
  }
};

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get('/profile/', sessionChecker, UsersController.SelfProfile);
router.post('/profile/', sessionChecker, UsersController.ShowProfile);

module.exports = router;
