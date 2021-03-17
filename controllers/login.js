var User = require('../models/user');
var bcrypt = require('bcrypt');


var LoginController = {
    Index: function(req, res) {
      res.render('login/index');
    }, 

    Dashboard: function(req,res) {
      if (!req.body.password || !req.body.username) {
        res.status(400).send({
            status: false,
            message: 'Please input in all fields'
        })
    } else {
      User.findOne({ 
        username: req.body.username
                  })
        .then(function (user) {
            if (!user) {
            res.render('login/index', {
              message: 'This user is not registered',
              messageClass: 'alert-danger'});
            }
           else {
           bcrypt.compare(req.body.password, user.password, function (err, result) {
         if (result == true) {
          req.session.user = user;
           res.redirect('/posts');
         } else {
           res.render('login/index', {
            message: 'incorrect password',
            messageClass: 'alert-danger'});
          }
         })
       }
      });
    }
    }
  };
    


  module.exports = LoginController;