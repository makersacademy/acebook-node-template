const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find({})
      .populate("author")
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        
        console.log(posts);
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
    Post.find({ _id: req.body.postid}).exec((err, post) => {
      if (err) {
        throw err;
      }
      post.like += 1;
      console.log(post);
      res.status(201).redirect("/posts");
    })
  },
};

module.exports = PostsController;
