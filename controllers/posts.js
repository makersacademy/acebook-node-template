var Post = require('../models/post');
var mongoose = require('mongoose');
var PostsController = {
  
  
  Index: function(req, res) {
    Post.find().sort( {date: -1}).exec(function(err, posts) {
      if (err) { throw err; }
      res.render('posts/index', { posts: posts });
    });
  },
  
  // Index: function(req, res) {
  //   Post.find(function(err, posts) {
  //     if (err) { throw err; }
  //     res.render('posts/index', { posts: posts });
  //   });
  // },
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
    Post.findOneAndDelete( {
       _id: mongoose.Types.ObjectId(req.body.id)}, function(err, posts) {
      res.status(201).redirect('/posts');
    });
      
  } 
};

module.exports = PostsController;
