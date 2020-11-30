var Post = require('../models/post');


var PostsController = {
  Index: function(req, res) {
    if(!req.session.test) {
      res.status(201).redirect('/')
    };
    Post.find({}, null, {sort: {date: -1}},function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts, test: req.session.test });
    });
  },
  Create: function(req, res) {


    req.body.owner = req.session.name;
    req.body.date = new Date();

      var post = new Post(req.body);
      post.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/posts');
      });
    }
  };

module.exports = PostsController;
