const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate({path: "user", select: "email"}).exec((err, posts) => {
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
    const postInfo = req.body;
    postInfo.user = req.session.user._id;
    const post = new Post(postInfo);

    console.log(req.body);
    console.log(req.session.user);
    console.log(req.session.user._id);
    console.log(post);
    console.log(postInfo);

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
