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
    var id = req.params.postId;
    Post.findByIdAndDelete(id, function (err, id){
      if (err){
        console.log(err);
    }
    else{
        console.log("Deleted : ", id);
    }
    res.redirect('/posts');})
  }
};

module.exports = PostsController;
