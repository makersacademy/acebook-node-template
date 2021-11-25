var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find({}).sort('-createdAt').exec(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    // which user is creating this post?
    const user_name = null
    const user_id = null
    // how do we find out which user loged in?
    var post = new Post(req.body, user_name, user_id);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
