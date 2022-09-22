const Post = require("../models/post");
const Comment = require("../models/comment");
const { request } = require("express");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    });
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
  View: (req, res) => {
    const postId = req.params.id;

    Post.findOne({ _id: postId }).then((post) => {
      if (!post) {
        res.redirect("/posts");
      } else {
        res.render('posts/post', { post: post });
      }
    });
  }, 
  CreateComment: (req, res) => {
    // req.body = { newComment: 'comment from form' }
    const comment = new Comment({
      message: req.body.newComment,
      postId: req.params.id
    })

  }
};

module.exports = PostsController;
