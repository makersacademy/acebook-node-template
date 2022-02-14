var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post({ 
      message: req.body.message, 
      postedBy: req.session.user._id,
      likes: 0,
    });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
  CountLikes: function(req, res) {
    post.likes++; 
    post.save(function(err) {
      if (err) { throw err; }

      res.render('/posts/index', { posts: likes} );
    })
  }
};

module.exports = PostsController;