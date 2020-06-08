'use strict'
const bcrypt = require('bcrypt');
var User = require('../models/user');

var UserController = {

  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'});
  },

  Create: function(req, res) {

    var unhashedPassword = req.body.password
    // var hashedPassword  = bcrypt.hash(unhashedPassword, 10, function(err, hash){
    //   if (err) { console.log(err) }
    //   console.log(hash)
    //   return hashedPassword = hash
    // })     
    
    // var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hashedPassword});

     var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: bcrypt.hash(unhashedPassword, 10, function(err, hash){
        if (err) { console.log(err) }
        console.log( hash)
        typeOf(hash);
     })});


    User.findOne( {email: req.body.email}, function(err, result) {
      // findOne will return "null" if emal is not found in the database
      // so it will skip this IF statement and move on to next code block
      if (result != null && result.email != null && req.body.email == result.email) {
        res.render('user/validateSignUp', { signupMessage: "This email is already registered."});
      }
    })

    user.save(function(err) {

      if (err) { console.log(err) }
       res.redirect('/');
       //res.render('user/validateSignUp', { signupMessage: "Sign up sucessful", welcomeMessage: "Welcome ",  firstName: req.body.firstName} )
    });

    //req.session.user = user._id

  },

  Validate: function(req, res) {
    // console.log(req)
    User.findOne( {email: req.body.email}, function(err, result) {

      if(result.password == req.body.password) {
        req.session.user = result
        //res.render('user/validateLogin', { loginMessage: "Login sucessful.", firstName: result.firstName } )
        res.redirect('/newsfeed');
      } else {
        res.render('user/validateLogin', { loginMessage: "Login unsuccessful: incorrect email or password."})
      }
    })
  },
}

module.exports = UserController;
