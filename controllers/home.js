var User = require('../models/user');
var bcrypt = require('bcrypt');
var saltRounds = 10;

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  Registration: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      let hash = bcrypt.hashSync(password, saltRounds)
      var user = new User({ username: username, password: hash })
      user.save(function(err) {
        if (err) { 
          return res.status(401).redirect('/error')
         }

        return res.status(201).redirect('/');
        
      });
    },

    Error: function(req, res) {
      res.render('error', {message: 'Username is in use'});
    }
};

module.exports = HomeController;
