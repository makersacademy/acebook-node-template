var User = require('../models/user');
var bcrypt = require('bcrypt');


const saltRounds = 10;


var SignupController = {
    Index: function(req, res) {
      res.render('signup/index');
    },

    Create: function(req, res) {
      let pword = req.body.password
      if(pword.length < 4 ) {
        res.render('signup/index', {
          message: 'Password needs to be at least 4 characters',
          messageClass: 'alert-danger' });

      } else {
      bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
      var user = new User( {username: req.body.username, password: hash});

      user.save(function(err) {
        if (err) {
          let error = err.errors
          res.render('signup/index', {
          message: error.username.properties.message,
          messageClass: 'alert-danger'});
        } else { 
          res.status(201).redirect('/login');
      }
      });
      });
    }
    }
    }
  module.exports = SignupController;

