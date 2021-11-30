var Post = require('../models/post');
var Like = require('../models/like');

var PostsController = {
  Index: function(req, res) {
    Like.countAllLikes(function(err, allLikes){
      if (err) { throw err; }
      Post.find({}).sort('-createdAt').exec(function(err, posts) {
        if (err) { throw err; }
        // storing the like count inside the post object, 
        // because switching context in handlebars seems more complicated
        // probably good to move it into the post model though
        posts.forEach(function(post){
          const likesForPost = allLikes.filter((like) => like._id == post._id);
          post.count = (likesForPost.length !== 0 ? likesForPost[0].count : 0)
        });
        res.render('posts/index', { posts: posts });
      });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
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
