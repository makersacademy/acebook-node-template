var User = require('../models/signup');

var SignupController = {
  Index: function(req, res) {
    User.find(function(err, myusers) {
      if (err) { throw err; }
      res.render('signup/index', { username: myusers });
    });
  },

  Create: function(req, res) {
    var user = new User();
      username = req.body.username;

    user.save(function(err) {
      if (err) { throw err; }
    });
  }
};

module.exports = SignupController;
