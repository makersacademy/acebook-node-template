const User = require("../models/user");
const bcrypt = require('bcrypt');

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
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
        req.session.user = user;
        res.redirect("/posts");
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
