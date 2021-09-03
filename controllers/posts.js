var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find({}, function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    }).sort({ 'created_on': -1 });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
  Delete: function(req, res) {
    res.render('posts/delete', {})
  },

  Remove: function(req, res) {
    console.log(req.body.message)
    // var post = new Post(req.body);
    Post.deleteOne({ message: req.body.message }, function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
};

module.exports = PostsController;