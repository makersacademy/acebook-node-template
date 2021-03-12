var Post = require('../models/post');
var Comment = require('../models/comment');
var mongoose = require('mongoose');
var PostsController = {

  Index: function(req, res) {
    Post.find().sort( {date: -1}).populate({path: 'comment'}).exec(function(err, posts) { console.log(posts)
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
    Post.findOneAndDelete( {
       _id: mongoose.Types.ObjectId(req.body.id)}, function(err) {
        if (err) { throw err; }
        res.status(201).redirect('/posts');
    });   
  },
  Comment: function(req, res) {
   var comment = new Comment ({ comment: req.body.comment })
comment.save().then(function (result) {
  return Post.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body.id) },
    { $push: { comments: result} },
    console.log(req.body.id),
   console.log(result),
  );
}).then(function (result) {
  console.log('updated post');
  res.redirect('/posts');
});  
},
}

module.exports = PostsController;