const bcrypt = require("bcryptjs");
const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {message: false, session: req.session});
  },

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {

      if (!user) {
        res.render("sessions/new", {layout: false, message: "Invalid details", session: req.session});
      } else {bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              throw err;
            }
            if (result === false) {
              res.render("sessions/new", {layout: false, message: "Invalid details", session: req.session});
            } else {
              req.session.user = user;
              res.redirect("/posts");
            }
          })
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
