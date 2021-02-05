const User = require("../models/users");

var SignUpController = {
SignUp: function(req, res) {
    res.render('home/signup', { 
        title: 'Acebook',
        user: new User()
    });
  }
};

module.exports = SignUpController;
