'use strict'

var User = require('../models/user');

var UserController = {
  
  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'});
  },

  Create: function(req, res) {
    var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});

    User.findOne( {email: req.body.email}, function(err, result) { 
      // findOne will return "null" if emal is not found in the database
      // so it will skip this IF statement and move on to next code block
      if (result != null && result.email != null && req.body.email == result.email) { 
        res.render('user/validateSignUp', { signupMessage: "This email is already registered."}); 
      }
    })

    user.save(function(err) {

      if (err) { console.log(err) }
      // route was formerly '/validate'
      // res.status(201).redirect('/validateSignUp');
      res.render('user/validateSignUp', { signupMessage: "Sign up sucessful.", firstName: req.body.firstName} )
    });

    req.session.user = user._id

  },

  Validate: function(req, res) {
    console.log(req)
    User.findOne( {email: req.body.email}, function(err, result) {

      if(result.password == req.body.password) {
        res.render('user/validateLogin', { loginMessage: "Login sucessful." } )
      } else {
        res.render('user/validateLogin', { loginMessage: "Login unsuccessful: incorrect email or password."})
      }
    })
  },
}

module.exports = UserController;