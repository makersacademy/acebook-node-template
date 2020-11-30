var Post = require('../models/post');


var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }
      console.log(posts);
      res.json({posts: posts});
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
  Delete: function(req, res) {
    var id = req.params.postId;
    Post.findByIdAndDelete(id, function (err, id){
      if (err){
        console.log(err);
    }
    else{
        console.log("Deleted : ", id);
    }
    res.redirect('/posts');});
  },

  Find: function(req, res) {
      var id = req.params.postId;
      Post.findById(id, function (err, post){
        if (err){
          console.log(err);
      }
      else{
          console.log(post);
      }
      res.json(post);
    });
  },
//like function needs to only work when user is signed in and not allow
//them to like a post more than once
  Like: function(req, res) {
      var id = req.params.postId;
      Post.findById(id, function (err, post){
        if (err){
          console.log(err);
      }
      else{
        var long = post.like.length;
        console.log(long);
        post.like.push('555');//needs user id to insert
        post.save();
        console.log(post.like.length);
      }

      res.json(post);

  });
  }
}

module.exports = PostsController;
