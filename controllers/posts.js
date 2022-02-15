var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {

    var post = new Post({
      message: req.body.message,
      posterID: req.session.user._id,
      posterName: req.session.user.firstname,
      comments: {},
      likes: 0,
    });
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },

  NewComment: function(req, res) {
    const options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    Post.findByIdAndUpdate(
      req.body.postid, 
      { $push: {
         comments: {
            comment: req.body.comment,
            user: req.session.user.firstname,
            datetime: new Date().toLocaleDateString("en-GB", options),
         }
        }
      }, 
      {new:true}, 
      function(err) {
        if (err) { throw err; }
      }
    )

    res.redirect('/posts');
  }

};

module.exports = PostsController;