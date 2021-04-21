var User = require('../models/user');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  Registration: function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      user = new User({ username: username, password: password })
      user.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/');
      });
    }
};

module.exports = HomeController;
