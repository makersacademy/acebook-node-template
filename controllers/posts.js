var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    var loggedIn = req.cookies.userId
    var username = req.cookies.username
      console.log(req.cookies.userId)

    Post.find({}).sort({date: -1}).exec(function(err, posts) {
      console.log('***********')
      console.log(req.cookies.username)
      console.log('***********')
      if (err) { throw err; }

      res.render('posts/index', { posts: posts, loggedIn: loggedIn, username: username  })
      // res.render('posts/index', { users: users });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
      ///login
    });
  }
};

module.exports = PostsController;
