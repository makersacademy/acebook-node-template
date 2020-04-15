var User = require('../models/user');

var UserController = {
  // Index: function(req, res) {
  //   Post.find(function(err, posts) {
  //     if (err) { throw err; }
  //
  //     res.render('posts/index', { posts: posts });
  //   });
  // },
  // New: function(req, res) {
  //   res.render('posts/new', {});
  // },
  Create: function(req, res) {
    User.findOne({ name: req.body.name }, function(err, user){
      if(err) { throw err }
      if(user){ res.redirect('../?error=' + "That user already exists, either sign in, or choose a different username") }
      else {
        var newUser = new User(req.body);
        newUser.save(function(err) {
        if (err) { throw err; }
      res.status(201).redirect('/user/signin');
      });
      }
    });

  },

  Signin: function(req, res) {
    res.render('user/signin', {});
  }
};

module.exports = UserController;
