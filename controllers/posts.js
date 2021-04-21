require('../models/post');
var Post = require('../models/post');
require('../routes/posts');

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
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
  Delete: function(req, res) {
    var post = Post.findById(req.params.id)
    console.log(post)
    post.deleteOne( function(err) {
      if (err) { throw err;}
  
      res.status(201).redirect('/');
    });
  }


};

module.exports = PostsController;
