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
    // console.log('*******************CREATE************************');
    console.log(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },

  // Update: function(req, res){
  //   var id = req.body.id
  //   var message = req.body.message
  //   Post.updateOne({"_id" : id}, {$set: {"message": message}}, {upsert: true}, function(err){
  //     if(err) { throw err; }

  //     res.status(201).redirect('/posts')
  //   })
  // },

  // UpdatePage: function(req, res) {
  //   res.render('posts/update', {});
  // },

  Delete: function(req, res){ 
    var id = req.params.id; 
    // console.log('*********************DELETE**********************');
    console.log(req.body);
    console.log(id);
    Post.findByIdAndRemove(id, function(err){
      if(err){
        console.log(err);
      }
      res.status(201).redirect('/posts');
    });
  } 
};

module.exports = PostsController;
