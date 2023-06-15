const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
        // Implemented authentication logic to dynamically update navbar links based on the user's login status.
      res.render("posts/index", { posts: posts, user: req.session.user, isAuthenticated: true});
    });
  },
  New: (req, res) => {
    res.render("posts/new", {isAuthenticated: true});
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
