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
      console.log(user)
      if (!user) {
        console.log('not re directing to session')
        req.session.message = {
          type: 'danger',
          intro: "DUCKIN' ELL! THIS EMAIL DOES NOT EXIST",
          message: "Why don't you just sign up and then you won't have this problem???"
        }
        res.redirect('/');
      } else {
        const hashPassword = user.password;
        bcrypt.compare(plainTextPassword, hashPassword, (err, result) => {
          if (result) {
            req.session.user = user;
            res.redirect('/posts');
          } else {
            req.session.message = {
              type: 'danger',
              intro: 'EMAIL AND PASSWORD DO NOT MATCH',
              message: 'You better remember next time, Duck brain!'
            }
            console.log(err);
            res.redirect('/');
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
