const Post = require('../models/post');

const PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) {
        throw err;
      }

      res.render('posts/index', {
        posts: posts});
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    const post = new Post(req.body);
    post.save(function(err) {
      if (err) {
        throw err;
      }

      res.status(201).redirect('/posts');
    });
  },
  Delete: function(req, res) {
    Post.findByIdAndRemove({_id: req.params._id}, function(err) {
      if (err) {
        throw err;
        } 
    res.status(201).redirect('/posts');
  });
},
};
module.exports = PostsController;
