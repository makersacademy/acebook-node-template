const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts.reverse() });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    req.body = {
      message: req.body.message,
      firstname: req.session.user.firstname,
      likes: 0,
    };
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Like: (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } }).exec(
      function (err) {
        if (err) {
          console.log(err);
          res.redirect("back");
        } else {
          res.redirect("/posts");
        }
      }
    );
  },
};

module.exports = PostsController;
