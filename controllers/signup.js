var User = require('../models/signup');
var SignupController = {
  Index: function(req, res) {
    console.log("test")
    User.find(function(err, myusers) {
      if (err) { throw err; }
      res.render('signup/index', { myusers: myusers});
    });
  },
  New: function(req, res) {
    res.render('signup/index', {});
  },
  Create: function(req, res) {
    var user = new User({
      firstname: req.body.firstname,
      secondname: req.body.secondname,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/');
    });
  }
};
module.exports = SignupController;
