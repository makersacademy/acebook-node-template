'use strict'
const bcrypt = require('bcrypt');
var User = require('../models/user');
var UserController = {

  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'});
  },

  Create: function(req, res) {

    // var sendErrorFlashMessage = (request, route, message) => {
    //   console.log(request.body);
    //   request.redirect(route);
    // };

    var password = req.body.password;
    var email = req.body.email;
    var user;

    User.findOne( {email: req.body.email}, function(err, result) {
      //console.log(req);
      // if(result) { sendErrorFlashMessage(req, '/', 'This email is already registered'); return; }
      if (result) {
        req.session.errorMessage = "This email is already registered."
        res.redirect('/');
        return; // early return to avoid bcrypt running
      }

      bcrypt.hash(password, 10, function(err, hash) {
        user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash});
        user.save(function(err) {
          if (err) { console.log(err) }
          res.redirect('/');
        });
      });
    });
  },

  Validate: function(req, res) {
    User.findOne( {email: req.body.email}, function(err, result) {
      if (result == null) { 
        //res.render('user/validateLogin', { loginMessage: "Login unsuccessful: incorrect email or password."});
        req.session.errorMessage = "Login unsuccessful: incorrect email or password."
        res.redirect('/');
        return null  
    }
      bcrypt.compare(req.body.password, result.password, function(err, match) {
        if (match) {
          req.session.user = result;
          res.redirect('/');
        } else {
          if (err) { console.log(err) }
          req.session.errorMessage = "Login unsuccessful: incorrect email or password."
          res.redirect('/');
          // res.render('user/validateLogin', { loginMessage: "Login unsuccessful: incorrect email or password."})
        }
      })

    })
  },  
}

module.exports = UserController;
