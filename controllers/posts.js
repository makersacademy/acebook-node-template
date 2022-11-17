const Post = require("../models/post");


const PostsController = {
  Index: (req, res) => {
    Post.find().populate("author").sort({ createdAt: -1 }).exec((err, posts) => {
      if (err) {
        throw err;
      }

            res.render("posts/index", { posts: posts, loggedIn: req.session.loggedIn });
        });

    },
    New: (req, res) => {
        res.render("posts/new", { loggedIn: req.session.loggedIn });
    },
    Create: (req, res) => {
        var post = new Post({
            message: req.body.message,
            author: req.session.user
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
    getTheUser: (req, res) => {
      let foundUser = Post.find({message: req.body.message}).populate("author");
      res.json(foundUser);
    }
};

module.exports = PostsController;
