const Post = require("../models/post");

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
    console.log(req.params);
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId(req.body.id);
    console.log(id);
    Post.deleteOne({ _id: id }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts");
    });
    // console.log(req.body.id);
  },
};

module.exports = PostsController;
