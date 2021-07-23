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


  UpdatePage: function(req, res) {
    var id = req.params.id;

    Post.findById(id, function(err, post){
      if (err) { throw err; }

      res.render('posts/update', {id: post.id, message: post.message});
    })
  },

  Update: function(req, res){
    var id = req.params.id
    var message = req.body.message

    Post.updateOne({"_id" : id}, {$set: {"message": message}}, {upsert: true}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/posts')
    })
  },

  Delete: function(req, res){
    var id = req.params.id;

    Post.findByIdAndRemove(id, function(err){
      if(err){
        console.log(err);
      }
      res.status(201).redirect('/posts');
    });
  },

  UpdateLikes: function(req, res){
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      if (err) {throw err;}

      post.postLikeCounter += 1;

      post.save(function(err) {
        if (err) {throw err;}
        res.status(201).redirect('/posts')
      });
    });
  },

  UpdateDislikes: function(req, res){
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      if (err) {throw err;}

      post.postDislikeCounter += 1;

      post.save(function(err) {
        if (err) {throw err;}
        res.status(201).redirect('/posts')
      });
    });
  },

  Comment: function(req, res){
    var id = req.params.id
    var newComment = req.body.comment

      Post.findById(id, function(err, post) {
      if (err) { throw err; }

      post.comments.push(newComment)
      post.save();

      res.render('/posts', {id: post.id, comments: post.comments});
      res.status(201).redirect('/posts')

    })
  }
};


module.exports = PostsController;
