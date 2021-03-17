var User = require('../models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;


var SignupController = {
    Index: function(req, res) {
      res.render('signup/index');
    },

    Create: function(req, res) {
      bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
      var user = new User( {username: req.body.username, password: hash});

      user.save(function(err) {
        if (err) {
          res.status(400).send('This username is already taken')
        } else {
        res.status(201).redirect('/login');
      }
      });
      });
    },
}
  module.exports = SignupController;