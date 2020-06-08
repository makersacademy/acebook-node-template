var User = require('../models/user');

var UserController = {
  Index:function(req, res){

    req.session.viewCount += 1;

    res.render('user/signup', { title: 'Signup to Acebook', viewCount: req.session.viewCount  }); // is this useruser grabbing entire instance
  },

  Create: function(req, res) {
    var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password});

    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/signup/validate');
    });
    req.session.user = user._id
  },

  Validate: function(req, res){

    User.findOne({ _id: req.session.user }, function(err, user) {
      if (err) { throw err; }

      res.render('user/valid', { firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, user: req.session.user });
    });
  },
};

module.exports = UserController;
