var Post = require('../models/post');
// const { post } = require('../routes/posts');

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

    console.log(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },

  UpdatePage: function(req, res) {
    var id = req.params.id;
    Post.findById(id, function(err, post){
      if (err) {throw err;}

      res.render('posts/update', {id: post.id, message: post.message});
    })
    console.log("Start of the log");
  },

  Update: function(req, res){
    var id = req.params.id
    console.log(req.params)
    var message = req.body.message
    console.log(message)
    console.log("End of the log")
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
  }
};

module.exports = PostsController;
