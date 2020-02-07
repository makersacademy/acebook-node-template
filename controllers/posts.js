var Post = require('../models/post');  // connects to the model which allows you to access database

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {    // like select all in sql
      if (err) { throw err; }       // if it returns an error throw the error

      res.render('posts/index', { posts: posts.reverse() });  // render the post index view
    });
  },
  New: function(req, res) {
    if (req.cookies['username']){
      res.render('posts/new', {});    // render the 'new' index view
    } else {
      res.redirect('/users/register');
    }
  },

  Create: function(req, res) {
    if (req.cookies['username']){
    var post = new Post({
      message:req.body.message,
      postedby: req.cookies['username']
    });  // creates a new instance of post with the text
    post.save(function(err) {       // saves the new post
      if (err) { throw err; }

      res.status(201).redirect('/posts');      // if it works show you the list of posts
    });
  } else {
    res.redirect('/users/register');
  }
  }
};

module.exports = PostsController;
