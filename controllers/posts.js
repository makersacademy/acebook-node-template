var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) { //posts = rows of the table   { _id: 5ed6b2d944b7545dc3729fa3, message: 'tanil', __v: 0 },  { _id: 5ed6c857c5696863fd7d1bef, message: '1', __v: 0 } you can define the variable name
      if (err) { throw err; }

      res.render('posts/index', { posts: posts }); // first posts which is made by user, and it goes to hbs. second one it comes from Post.find(function(req,posts))
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body); //[Object: null prototype] { message: 'deneme3' } this is what you have when you add something . req.body == params
    post.save(function(err) { //The save() returns a WriteResult object that contains the status of the insert or update operation. 
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
