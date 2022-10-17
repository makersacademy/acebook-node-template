const Post = require("../models/post");
const Comment = require("../models/comment");

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
        console.log(posts[0].comments[0].message);
        res.render("posts/index", { posts: posts });
      });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      author: req.session.user._id,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
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
      ).exec((err, post) => {
        if (err) throw err;
        res.redirect("/posts");
      });
    });
  },
};

module.exports = PostsController;
