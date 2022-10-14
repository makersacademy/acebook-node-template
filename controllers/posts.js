const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find({})
      .populate("author")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }

        // console.log(posts);
        res.render("posts/index", { posts: posts });
      });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      author: req.session.user._id,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Like: (req, res) => {
    Post.updateOne(
      { _id: req.body.postid },
      { $addToSet: { like: req.session.user._id } }
    ).exec((err, post) => {
      if (err) {
        throw err;
      }
      console.log(post.like);
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
