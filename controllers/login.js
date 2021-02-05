const User = require("../models/users");

var LoginController = {
  Index: function(req, res) {
    res.render('home/login', { title: 'Acebook' });
    },
  Login: function(req, res) {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err)
      } else {
        res.json(user)
      }
    })
  }
};

  module.exports = LoginController;
  