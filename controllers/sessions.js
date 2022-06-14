const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).exec(function(error, user) {
      if (error) {
        res.redirect("/sessions/new");
      } else if (!user) {
        res.redirect("/sessions/new");
      } else {
        user.comparePassword(password, function(matchError, isMatch) {
          if (matchError) {
            res.redirect("/sessions/new");
          } else if (!isMatch) {
            res.redirect("/sessions/new");
          } else {
            req.session.user = user;
            res.redirect("/posts");
          }
        })
      }
    })
  },
  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  }
}
module.exports = SessionsController;