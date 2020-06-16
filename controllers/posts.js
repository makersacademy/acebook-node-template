const Post = require('../models/post');


const PostsController = {
  Index: function(req, res) {
    Post.find().sort('-created_at').exec(function(err, posts) {
     if (err) {
       throw err;
     }

      res.render('posts/index', {
        posts: posts });
      });
  },

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    const post = new Post(req.body);
    post.save(function(err) {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/posts');
    });
  },
  Like: function(req, res) {
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$inc: { likes: 1 }},
    function(err, posts) {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/posts');
    });
  },


  Delete: function(req, res) {
    Post.findByIdAndRemove({_id: req.params._id}, function(err) {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/posts');
    });
  },

  Update: function(req, res) {
    Post.find({_id: req.params._id}, function(err, posts) {
      if (err) {
        throw err;
      }
      res.render('posts/edit', {
        posts: posts});
    });
  },

  Edit: function(req, res) {
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$set: {message: req.body.message}},
    function(err, posts) {
      if (err) {
        throw err;
      }
      res.status(201).redirect('/posts');
    });
  },



  Comment: function(req, res) {
    Post.find({_id: req.params._id}, function(err, posts) {
      if (err) {
        throw err;
      }
      res.render('posts/comment', {
        posts: posts});
    });
  },

  PostComment: function(req, res) {
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$push: {comments: req.body.comments}},
    function(err, posts) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },


};
module.exports = PostsController;
