var User = require('../models/user');
var Post = require('../models/post')

var UsersController = {
  New: function(req, res) {
    res.render('users/new', {});
  },


    Profile: function(req, res) {
      Post.find({postedBy: req.session.user._id})
  .then(posts => {
    res.render('users/profile', {posts: posts})
    })
  },

  Create: function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  }
};

module.exports = UsersController;
