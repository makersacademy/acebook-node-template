const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    }).sort({'createdAt': - 1});
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Comment: async (req, res) =>  {
    Post.find({_id: req.params._id}, function(err, posts) {
      if (err) {
        throw err;
      }
      res.render('posts/comment', {
        posts: posts});
    });
  },

  CreateComment: (req, res) => {
    var comment = new Comment({ note: `${req.body.comments}`})
  
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$push: {comments: comment}},
    function(err, posts) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },

  // untested code for controller
  // like functionality
  LikeComment: (req, res) => {
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$inc: {likes: 1}},
    function(err) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },

  // delete post functionality
  Delete: (req, res) => {
    Post.findByIdAndRemove({_id: req.params._id}, function(err) {
      if (err) {
        throw err;
        }
        res.status(201).redirect('/posts');
      });
    },
  };


module.exports = PostsController;
