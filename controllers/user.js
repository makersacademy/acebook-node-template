'use strict'
const bcrypt = require('bcrypt');
var User = require('../models/user');
var UserController = {

  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'});
  },

  Create: function(req, res) {
    User.findOne( {email: req.body.email}, function(err, result) {
      if(result) { sendFlashMessage(res, req, '/', 'This email is already registered.'); return; }

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash});
        user.save(function(err) {
          if (err) { console.log(err) }
          sendFlashMessage(res, req, '/', "Sign up successful.");
        });
      });
    });
  },

  Login: function(req, res) {
    User.findOne( {email: req.body.email}, function(err, result) {
      if (result == null) { sendFlashMessage(res, req, '/', "Login unsuccessful: incorrect email or password."); return; }
      bcrypt.compare(req.body.password, result.password, function(err, match) {
        if (match) { req.session.user = result; res.redirect('/'); return; }
        sendFlashMessage(res, req, '/', "Login unsuccessful: incorrect email or password.")
      });
    });
  }, 
  Logout: function(request, response) {
    request.session.user = null;
    sendFlashMessage(response, request, '/', 'You logged out.');
  } 
}

var sendFlashMessage = (response, request, route, message) => {
  request.session.errorMessage = message;
  response.redirect(route);
};

module.exports = UserController;
