const User = require("../models/user");
const bcrypt = require('bcrypt');

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", { loggedIn: req.session.loggedIn, username: req.session.username });
  },

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let isCorrect;

    User.findOne({ email: email }).then((user) => {
      bcrypt.compare(password, user.password, function(err, result) {
        isCorrect = result;
      });
      if (!user) {
        res.redirect("/sessions/new");
      } else if (isCorrect == false) {
        res.redirect("/sessions/new");
      } else {
        req.session.loggedIn = true;
        req.session.user = user;
        req.session.username = req.session.user.name;
        res.redirect("/posts");
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
      req.session.loggedIn = false;
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
