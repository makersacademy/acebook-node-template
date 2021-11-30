var Post = require('../models/post');

// add new var for dynamic nav bar and added to line 10 and 14
var activeUser = true;

var PostsController = {
  Index: function(req, res) {
    Post.find({}).sort('-createdAt').exec(function(err, posts) {
      if (err) { throw err; }
      res.render('posts/index', {loggedIn: activeUser, posts: posts });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {loggedIn: activeUser});
  },
  Create: function(req, res) {
    const post = new Post({
      message :req.body.message, 
      user_name: req.session.user.email, 
      user_id: req.session.user.email._id
      });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
