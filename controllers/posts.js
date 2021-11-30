var Post = require('../models/post');
var Like = require('../models/like');

var PostsController = {
  Index: function(req, res) {
    Like.countAllLikes(function(err, allLikes){
      if (err) { throw err; }
      Post.find({}).sort('-createdAt').exec(function(err, posts) {
        if (err) { throw err; }

        const likeCount = new Map();
        allLikes.forEach(function(element){
          likeCount.set(element._id, element.count )
          likeCount.get(element._id) 
        });
        console.log(likeCount)
        res.render('posts/index', { posts: posts, likeCount: likeCount });
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
