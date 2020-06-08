var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) { //posts = rows of the table   { _id: 5ed6b2d944b7545dc3729fa3, message: 'tanil', __v: 0 },  { _id: 5ed6c857c5696863fd7d1bef, message: '1', __v: 0 } you can define the variable name
      if (err) { throw err; }


      res.json(posts);
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    console.log(post)
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/api/posts');
    });
  }
};

module.exports = PostsController;
