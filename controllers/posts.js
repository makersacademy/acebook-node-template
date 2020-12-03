var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {

    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.json({posts: posts});
    });
  },

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post({
      userId: req.body.userId,
      message: req.body.message,
      author: req.body.author
    });
    post.save(function(err) {
      if (err) { throw err; }
    });
    res.json({post: post});
  },
  Delete: function(req, res) {
    var postId = req.params.postId;
    Post.findByIdAndDelete(postId, function (err){
      if (err){ throw err; }
    });
    res.json({post: 'deleted'});
  },
  Find: function(req, res) {
    var postId = req.params.postId;
    Post.findById(postId, function (err, post){
      if (err){ throw err; }

      res.json({post: post});
    });
  },
//like function needs to only work when user is signed in and not allow
//them to like a post more than once
  Like: function(req, res) {
    var postId = req.params.postId;
    Post.findById(postId, function (err, post){
      if (err){ throw err; }
      post.likes +=1;
      post.like.push(req.body);
      post.save();
      res.json({post: post});

    });
  },

 UnLike: function(req, res) {
   var postId = req.params.postId;
   Post.findById(postId, function (err, post){
     if (err){ throw err; }
       console.log(post.like);
       try{
         (post.like).remove(req.body);
         post.save();
       }catch(err){
         throw error;
       }
        post.likes -= 1;
     res.json({post: 'deleted'});
   });

 }

}

module.exports = PostsController;

// Equivalent to `parent.children.pull(_id)`
//parent.children.id(_id).remove();
// Equivalent to `parent.child = null`
// parent.child.remove();
// parent.save(function (err) {
//   if (err) return handleError(err);
//   console.log('the subdocs were removed');
