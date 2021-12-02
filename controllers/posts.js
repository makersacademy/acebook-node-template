var Post = require('../models/post');
const Comment = require('../models/comment');

var PostsController = {
  Index: function(req, res) {
    Post.find({}).sort('-createdAt').exec(function(err, posts) {
      if (err) { throw err; }
      Comment.find({}).exec(function(err, comments) {
        if (err) { throw err; }
        posts.forEach(function(post){
          const hasComment = comments.filter((comment) => comment.post_id == post._id);
          post.comments = hasComment
        })
        res.render('posts/index', { posts: posts });
      })
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    const post = new Post({
      message: req.body.message, 
      user_name: req.session.user.email, 
      user_id: req.session.user.email._id
      });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
