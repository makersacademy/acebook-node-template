var Post = require('../models/post');
var Comment = require('../models/comment');
var mongoose = require('mongoose');
var PostsController = {

  Index: function(req, res) {
    Post.find().sort( {date: -1}).populate({path: 'comments'}).exec(function(err, posts) { 
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
  
  // Delete: function(req, res) {
  //   Post.schema.pre('remove', function(next) {
  //     // 'this' is the client being removed. Provide callbacks here if you want
  //     // to be notified of the calls' result.
  //     Comment.fineByIdAndRemove({ post_id: mongoose.Types.ObjectId(req.body.id)}).exec();
  //     next();
  // });
  //   Post.findOneAndRemove( {
  //      _id: mongoose.Types.ObjectId(req.body.id)}, function(err) {
  //       if (err) { throw err; }
  //       res.status(201).redirect('/posts');
  //   });   
  // },
  Comment: function(req, res) {
   var comment = new Comment ({ comment: req.body.comment, post_id: req.body.id })
  comment.save().then(function (result) {
  return Post.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body.id) },
    { $push: { comments: result._id} },
     );
}).
}).then(function () {
  console.log('updated post');
  res.redirect('/posts');
});  
},

Delete: function(req, res) {
    Comment.deleteMany({ post_id: mongoose.Types.ObjectId(req.body.id)}).exec();
    Post.findOneAndDelete( {
    _id: mongoose.Types.ObjectId(req.body.id)}, function(err) {
    if (err) { throw err; }
    res.status(201).redirect('/posts');
    });   
  },
}



module.exports = PostsController;