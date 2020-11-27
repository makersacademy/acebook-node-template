var User = require('../models/users');

var UsersController = {
  Index: function(req, res) {
    User.find(function(err, users) {
      if (err) { throw err; }
      console.log(users);
      res.render('users/index', {users: users});})
    },
    Create: function(req, res) {
      var user = new User(req.body);
      user.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/users');
      });
    },
};

module.exports = UsersController;
