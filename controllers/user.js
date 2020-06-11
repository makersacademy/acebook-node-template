'use strict'
const bcrypt = require('bcrypt');
var User = require('../models/user');
var UserController = {

  Index:function(request, response){
    response.render('user/signup', { title: 'Signup to Acebook', loginTitle: 'Login to Acebook'});
  },

  Create: function(request, response) {
    User.findOne( {email: request.body.email}, function(err, result) {
      if(result) { sendFlashMessage(response, request, '/', 'This email is already registered.'); return; }

      bcrypt.hash(request.body.password, 10, function(err, hash) {
        var user = new User({firstName: request.body.firstName, lastName: request.body.lastName, email: request.body.email, password: hash});
        user.save(function(err) {
          if (err) { console.log(err) }
          sendFlashMessage(response, request, '/', "Sign up successful.");
        });
      });
    });
  },

  Login: function(request, response) {
    User.findOne( {email: request.body.email}, function(err, result) {
      if (result == null) { sendFlashMessage(response, request, '/', "Login unsuccessful: incorrect email or password."); return; }
      bcrypt.compare(request.body.password, result.password, function(err, match) {
        if (match) { request.session.user = result; response.redirect('/'); return; }
        sendFlashMessage(response, request, '/', "Login unsuccessful: incorrect email or password.")
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
