var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }
      console.log(posts);
      res.render('posts/index', { posts: posts });
    } ).sort( { _id: -1 } ) ;
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
    res.redirect('/posts');})
  }
};

module.exports = PostsController;
