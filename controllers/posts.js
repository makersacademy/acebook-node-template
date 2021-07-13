var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }

      // sessionStorage.setItem("favoriteMovie", favoritemovie);
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

  UpdatePage: function(req,res) {
    res.render('posts/update', {});
  },
  Update: function(req, res){
    var id = req.body.id
    var message = req.body.message
    Post.updateOne({"_id" : id}, {$set: {"message": message}}, {upsert: false}, function(err){
      if(err) { throw err; }
      res.render('posts/update', {});

      res.status(201).redirect('/posts')
    })
  }
};


module.exports = PostsController;
