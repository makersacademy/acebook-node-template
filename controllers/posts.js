require('../models/post');
var Post = require('../models/post');
require('../routes/posts');

require('../models/post')
var Comment = require('../models/comment')
/* require('../routes/comments') */

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    }).sort({date: -1});
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
    post.deleteOne( function(err) {
      if (err) { throw err;}
      const response = {
        message: "Post successfully deleted",
        id: post._id
      };
      res.status(201).redirect('/posts');
    });
  },

  Update: function(req, res) {
    var post = Post.findById(req.params.id)
    post.updateOne()
  },
  
  Comment: function(req, res) {
    Post.findById(req.params.id, function() {
      var comment = new Comment(req.body);
      comment.save(function(err) {
        if (err) { throw err; }
        
        /* post.comments.unshift(comment);
        post.save(function(err) {
          if (err) { throw err; }
    
          res.status(201).redirect('/posts');
        }); */

      res.status(201).redirect('/posts');
      });
    })
    
  },


};

module.exports = PostsController;
