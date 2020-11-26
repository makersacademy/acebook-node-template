var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    if(!req.session.test) {
      res.status(201).redirect('/')
    };
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts, test: req.session.test });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    req.body.owner = 'Finn the human';
      var post = new Post(req.body);
      post.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/posts');
      });
    }
  };

module.exports = PostsController;
