const User = require("../models/user");
const bcrypt = require('bcrypt');

const SessionsController = {
  New: (req, res) => {
    res.render("home/index", {});
  },
  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const plainTextPassword = req.body.password;

    User.findOne({ email: email }).then((user) => {
      const hashPassword = user.password;
      if (!user) {
        res.redirect("/");
      } else {
        bcrypt.compare(plainTextPassword, hashPassword, (err, result) => {
          if (result) {
            req.session.user = user;
            res.redirect('/posts');
          } else {
            console.log(err);
            res.redirect('/sessions/new');
          }
        });
      }
    });
  },
  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/");
  },
};

module.exports = SessionsController;
