const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    }).sort({ createdAt: -1 });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },
  
  Create: (req, res) => {
    const post = new Post(req.body);
    const message = req.body.message;
    if (message != "") {
      post.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("/posts");
      });
    } else {
      res.redirect("/posts/new");
    }
  },
};

module.exports = PostsController;
