var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    });
  },
  New: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
