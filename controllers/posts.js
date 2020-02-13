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
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
  Logout: function(req, res) {
    req.session.destroy(function(err){  
      if(err){  
          console.log(err);  
      }  
      else  
      {  
        console.log("success");
          res.redirect('/');  
      }  
  });  
}
}

module.exports = PostsController;
