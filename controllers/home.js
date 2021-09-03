var User = require('../models/users');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },

  New: function(req, res) {
    var user = new User( { name: req.body.name, email: req.body.email, password: req.body.password});
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = HomeController;
