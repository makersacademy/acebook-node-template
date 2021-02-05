const User = require("../models/users");

var SignUpController = {
  Index: function(req, res) {
    res.render('home/signup', { 
        title: 'Acebook',
    });
  },
  Create: function(req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save((err, newUser) => {
      if (err) {
        res.get('home/signup')
      } else {
        res.status(201).redirect('/content');
      }
    })
  }
};

module.exports = SignUpController;
