var Post = require('../models/post');
var Like = require('../models/like');

// add new var for dynamic nav bar and added to line 10 and 14
var activeUser = true;

var PostsController = {
  Index: function(req, res) {
    Like.countAllLikes(function(err, allLikes){
      if (err) { throw err; }


      Post.find({}).sort('-createdAt').exec(function(err, posts) {
        if (err) { throw err; }
        const likeCount ={};
        allLikes.forEach (function(like){
          likeCount[like._id] = like.count
        });
        const userID = req.session.user._id
        Like.userLiked(userID, function(err, likedPosts){
          if (err) { throw err; } 
          posts.forEach(function(post){
            const isPostLiked = likedPosts.filter((like) => like.postID == post._id);
            post.liked = isPostLiked
          })
          res.render('posts/index', {loggedIn: activeUser, posts: posts, likeCount: likeCount });
        })
      });

    });
  },
  New: function(req, res) {
    res.render('posts/new', {loggedIn: activeUser});
  },
  Create: function(req, res) {
    const post = new Post({
      message :req.body.message, 
      user_name: req.session.user.email, 
      user_id: req.session.user._id
      });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
