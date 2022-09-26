const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), signedIn: req.session.signedIn});
    });
  },
  New: (req, res) => {
    res.render("posts/new", {signedIn: req.session.signedIn});
  },
  Create: (req, res) => {
    req.body.username = req.session.user.username;
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
