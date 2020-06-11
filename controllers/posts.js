var Post = require('../models/post');

var PostsController = {
  Index: function(req, res) {
    Post.find( function(err, posts) {
      if (err) { throw err; }
        posts = posts.reverse()
        res.json(posts)

      });
  },

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);

    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/api/posts')
    });
  },

  Delete: function(req, res){
    var id = req.body.id;
    Post.deleteOne({"_id" : id}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/api/posts')
    });
  },

  Update: function(req, res){
    console.log("in delete function")
    var id = req.body.id
    var message = req.body.message
    var date = req.body.date

    Post.updateOne({"_id" : id}, {$set: {"message": message, "date": date}}, {upsert: true}, function(err){
      if(err) { throw err; }

      res.status(201).redirect('/api/posts')
    })
  },

  findOne: function(req, res){
    console.log("in the retrieve function")
    var id = req.body.id
    Post.findOne({"_id" : id}, function(err, post){
      if(err) { throw err; }

      res.json(post);
    })
  },

  UpdateForm: function(req, res) {
    res.render('posts/update', {});
  }
}

module.exports = PostsController;
