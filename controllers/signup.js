var User = require('../models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;


var SignupController = {
    Index: function(req, res) {
      res.render('signup/index');
    },

    Create: function(req, res) {
      bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
      var user = new User( {username: req.body.username, password: hash});

      user.save(function(err) {
        if (err) {
          console.log(err.errors)
          console.log("looking for my error")
          console.log(err.errors.password.properties.message)
          console.log(err.errors.username.properties.message)

          res.status(400).send('SORRY This username is already taken')
        } else {
        res.status(201).redirect('/login');
      }
      });
      });
    },
}
  module.exports = SignupController;

// let errors = err.errors
// res.render(“signup”, {errors: errors})
// {{ #if errors.password.message }}
// <p>{{errors.password.message}}</p>
// {{ /if }}