var Post = require('../models/post');
var User = require('../models/users');
var Comment = require('../models/comment');


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
      message: req.body.message
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
// only finds free hanging posts
  Find: async function(req, res) {
    const allPosts = [];
    await User.find(function(err, users) {
      if (err) { throw err; }

      for (let i = 0; i < users.length; i++) {
        var usersPosts = users[i].posts;
        if (usersPosts.length > 0) {
          for (let j = 0; j < usersPosts.length; j++) {
            allPosts.push(usersPosts[j]);

          }
        }
      }

  });
  console.log(allPosts);
      var id = req.params.postId;
    var wantedPosts  =  allPosts.filter(function(post){ return post._id == id });
    res.json(wantedPosts[0]);
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
 },
  Comments: async function(req, res) {
    const allPosts = [];
    await User.find(function(err, users) {
      if (err) { throw err; }

      for (let i = 0; i < users.length; i++) {
        var usersPosts = users[i].posts;
        if (usersPosts.length > 0) {
          for (let j = 0; j < usersPosts.length; j++) {
            allPosts.push(usersPosts[j]);

          }
        }
      }

  });
  console.log(allPosts);
      var id = req.params.postId;
    var wantedPosts  =  allPosts.filter(function(post){ return post._id == id });
    res.json(wantedPosts[0].comments);
  },
  AddComment: async function(req, res) {
    var id = req.params.postId;
    const allPosts = [];
    await User.find(function(err, users) {
      if (err) { throw err; }

      for (let i = 0; i < users.length; i++) {
        var usersPosts = users[i].posts;
        if (usersPosts.length > 0) {
          for (let j = 0; j < usersPosts.length; j++) {
            allPosts.push(usersPosts[j]);

          }
        }
      }

  });
  var wantedPosts  =  allPosts.filter(function(post){ return post._id == id });
  wantedPosts[0].comments.push(req.body);
//  wantedPosts[0].save();
  const commentObject = new Comment(req.body);
  const postObject = new Post(wantedPosts[0]);
  postObject.comments.push(commentObject);
  postObject.save();
  res.json(postObject);

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
