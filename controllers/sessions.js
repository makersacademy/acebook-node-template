const User = require("../models/user");
const bcrypt = require("bcrypt")

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {messages: req.flash('err')});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        req.flash('err', 'Email address is not recognised')
        res.redirect("/sessions/new");
      } else if (bcrypt.compareSync(password, user.password) == false) {
        req.flash('err', 'Incorrect password')
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
