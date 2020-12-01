var Post = require('../models/post');
var User = require('../models/users');

var PostsController = {
  Index: function(req, res) {

    User.find(function(err, users) {
      if (err) { throw err; }
      const allPosts = [];
    
      for (let i = 0; i < users.length; i++) {
        var usersPosts = users[i].posts;
        if (usersPosts.length > 0) {
          for (let j = 0; j < usersPosts.length; j++) {
            allPosts.push(usersPosts[j]);
          }
        }
      }

      res.json({posts: allPosts});
  });
},

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var userid = req.params._id
    User.findById(userid, function (err, foundUser){
     foundUser.posts.push(req.body);
     foundUser.save();
         res.status(201);
         res.json({message: req.body.message});
    });
  },
  Delete: function(req, res) {
    var userid = req.params._id;
    User.findById(userid, function (err, foundUser){
      if (err){
        console.log(err);
    }
    else{
      var postId = req.body.postId;
      console.log(foundUser.posts)
      foundUser.posts.id(postId).remove();
      foundUser.save(function (err) {
        if (err) return handleError(err);
        console.log("Deleted : ", postId);
      })
        
    }
    res.redirect('/posts');})
  }
};

module.exports = PostsController;

// Equivalent to `parent.children.pull(_id)`
//parent.children.id(_id).remove();
// Equivalent to `parent.child = null`
// parent.child.remove();
// parent.save(function (err) {
//   if (err) return handleError(err);
//   console.log('the subdocs were removed');