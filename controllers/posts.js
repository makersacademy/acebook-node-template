const Post = require("../models/post");


const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

            res.render("posts/index", { posts: posts, loggedIn: req.session.loggedIn, username: req.session.username });
        }).sort({ createdAt: -1 });
    },
    New: (req, res) => {
        res.render("posts/new", { loggedIn: req.session.loggedIn, username: req.session.username });
    },
    Create: (req, res) => {
        var post = new Post({
            message: req.body.message,
            userID : req.session.user
        });
        //const message = req.body.message;
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
  },
};

module.exports = PostsController;
