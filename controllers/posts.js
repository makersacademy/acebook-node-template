const Post = require("../models/post");


const PostsController = {
  Index: (req, res) => {
    //populate("author") -> populates author with a user object.
    //sort({createdAt: -1}) -> sort posts by timestamp to get newest post first.
    Post.find().populate("author").sort({ createdAt: -1 }).exec((err, posts) => {
      if (err) {
        throw err;
      }
        res.render("posts/index", { posts: posts, loggedIn: req.session.loggedIn, username: req.session.username  });
      });
    },
    New: (req, res) => {
        res.render("posts/new", { loggedIn: req.session.loggedIn, username: req.session.username });
    },
    Create: (req, res) => {
        var post = new Post({
            message: req.body.message,
            author: req.session.user
        });
        if (post.message != "") {
          post.save((err) => {
            if (err) {
            throw err;
          }
        res.status(201).redirect("/posts");
      });
    } else {
      res.redirect("/posts/new");
    }
  }
};

module.exports = PostsController;
