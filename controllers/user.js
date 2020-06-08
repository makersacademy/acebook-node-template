'use strict'
const bcrypt = require('bcrypt');
var User = require('../models/user');

var UserController = {

  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'});
  },

  Create: function(req, res) {

    var password = req.body.password;
    var email = req.body.email;
    var user;

    User.findOne( {email: req.body.email}, function(err, result) {
      // findOne will return "null" if emal is not found in the database
      // so it will skip this IF statement and move on to next code block
      if (result != null && result.email != null && req.body.email == result.email) {
        res.render('user/validateSignUp', { signupMessage: "This email is already registered."});
      }
    })

    bcrypt.hash(password, 10, function(err, hash) {
      user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash});
      user.save(function(err) {
        if (err) { console.log(err) }
         res.redirect('/');
      });
   }
 )},

  Validate: function(req, res) {
    User.findOne( {email: req.body.email}, function(err, result) {
      console.log(req.body.password)
      console.log(result.password)
      bcrypt.compare(req.body.password, result.password, function(err, match) {
        if (match) {
          console.log("hey")
          req.session.user = result;
          res.redirect('/newsfeed');
        } else {
          if (err) { console.log(err) }
          res.render('user/validateLogin', { loginMessage: "Login unsuccessful: incorrect email or password."})
        }
      })

    })
  },
}

module.exports = UserController;
