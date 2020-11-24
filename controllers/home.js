var User = require('../models/user');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
  },
  Signup: function(req, res) {
    res.render('home/signup', { title: 'Acebook' });
  },
  Login: function(req, res) {
    res.render('home/login', { title: 'Acebook' });
  },
  CreateUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = HomeController;
