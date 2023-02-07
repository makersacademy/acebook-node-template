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
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
   Like: (req, res) => {
    const postId = req.params.id;
    Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, (err, post) => {
      if (err) {
        throw err;
      }

      res.redirect("/posts");
    });
  },
};

module.exports = PostsController;
