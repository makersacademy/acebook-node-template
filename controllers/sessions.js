const User = require('../models/user');
const bcrypt = require('bcrypt');

const SessionsController = {

  New: (req, res) => {
    res.render('sessions/login', {});
  },

  Create: (req, res) => {
    console.log('trying to log in');
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.redirect('/sessions/login');
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            throw err;
          }
          if (result === true) {
            req.session.user = user;
            res.redirect('/posts');
          } else {
            res.redirect('/sessions/login');
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
    res.redirect("/sessions/login");
  },
};

module.exports = SessionsController;
