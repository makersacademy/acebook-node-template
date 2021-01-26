'use strict'
var multer = require('multer');
var path = require('path');
var fs = require('fs');
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
        var photo = "";

        // console.log(request.file);

        if ( request.file == undefined ) {
           photo = fs.readFileSync(path.join(__dirname +'/../uploads/' + 'disapprove.png'));
        } else {
           photo = fs.readFileSync(path.join(__dirname +'/../uploads/' + request.file.filename))
        }
        
        var imageProperty = {
          data: photo,
          contentType: 'image/png'
        }

        var user = new User({firstName: request.body.firstName, 
          lastName: request.body.lastName, 
          email: request.body.email, 
          password: hash,
          profilePicture: imageProperty});
        
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

  Profile: function(request, response, next) {
    var newUserParams = {
      firstName: "Jimothy",
      lastName: "Saladberg",
      email: "jim@salads.com",
      password: "1234",
      profilePicture:
          {
              data: fs.readFileSync(path.join(__dirname +'/../uploads/' + request.file.filename)),
              contentType: 'image/png'
          }
      }
    var newUser = new User(newUserParams);
    newUser.save(function(err) {
      User.findOne({firstName: "Jimothy"}, function(err, result) {
        response.render("user/display", { image: result.profilePicture.data.toString('base64') })
      });
    });
  },

  ImageForm: function(request, response) {
    response.render('user/profile')
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
