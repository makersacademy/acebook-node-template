var Post = require('../models/post');
var User = require('../models/users');

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
  Like: async function(req, res) {
      var id = req.params.postId;
      var userId = req.params.userId;
      var userIdtoPass;

      await User.findById(userId, function (err){
        if(err){
          console.log(err);
        }
        else{
          userIdtoPass = userId;
        }
      })

      Post.findById(id, function (err, post){
        if (err){
          console.log(err);
      } else {
        if (post.like.includes(userIdtoPass)){
          console.log("Can't like twice.");
        } else if (userIdtoPass === null || userIdtoPass === undefined) {
          console.log("Wild null/undefined apeared.");
        } else {
        post.like.push(userIdtoPass);//needs user id to insert
        post.likes += 1;
        post.save();
        console.log(userIdtoPass);
      }
      }

      res.json(post);

  });
 },

 UnLike: async function(req, res) {
     var id = req.params.postId;
     var userId = req.params.userId;
     var userIdtoPass;

     await User.findById(userId, function (err){
       if(err){
         console.log(err);
       }
       else{
         userIdtoPass = userId;
       }
     })

     Post.findById(id, function (err, post){
       if (err){
         console.log(err);
     } else {
       if (!post.like.includes(userIdtoPass)){
         console.log("Nothing to unlike.");
       } else {
       post.like.splice(post.like.indexOf(userIdtoPass), 1);//needs user id to insert
       post.likes -= 1;
       post.save();
     }
     }

     res.json(post);

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
