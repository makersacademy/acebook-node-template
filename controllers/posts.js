const Post = require("../models/post");
const Comment = require("../models/comment");
const multer = require("multer");
const upload = multer().single("uploadedImage");

const PostsController = {
  Index: (req, res) => {
    Post.find({})
      .sort([["createdAt", -1]])
      .populate("author")
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .exec((err, posts) => {
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
    upload(req, res, (err) => {
      if (err) throw err;
      const post = new Post({
        author: req.session.user._id,
      });
      if (req.body.message != null && req.body.message != "") {
        post.message = req.body.message;
      }
      if (req.file) {
        post.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },

  Like: (req, res) => {
    Post.updateOne(
      { _id: req.body.postid },
      { $addToSet: { like: req.session.user._id } }
    ).exec((err) => {
      if (err) {
        throw err;
      }
      // need to add post to .exec to use
      res.status(201).redirect("/posts");
    });
  },
  Comment: (req, res) => {
    const comment = new Comment({
      message: req.body.content,
      author: req.session.user._id,
    });
    comment.save((err, comment) => {
      Post.updateOne(
        { _id: req.body.postid },
        { $addToSet: { comments: comment._id } }
      ).exec((err) => {
        if (err) throw err;
        res.redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
