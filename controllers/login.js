var User = require('../models/user');
var bcrypt = require('bcrypt');


var LoginController = {
    Index: function(req, res) {
      res.render('login/index');
    }, 

    Dashboard: function(req,res) {
      User.findOne({ 
        username: req.body.username
                  })
        .then(function (user) {
          if (!user) {
             res.redirect('/');
          } else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
         if (result == true) {
             res.redirect('/posts');
         } else {
          res.send('Incorrect password');
          res.redirect('/');
         }
       });
      }
   });
    }

  };
    


  module.exports = LoginController;