const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    let session = req.session.user;

    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts.reverse(), user: session });
    }).populate("user");
  },
  New: (req, res) => {
    let session = req.session.user;
    res.render("posts/new", { user: session });
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
};

module.exports = PostsController;
