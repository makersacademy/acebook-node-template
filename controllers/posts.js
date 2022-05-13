const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate({path: "user", select: "email"}).exec((err, posts) => {
      if (err) {
        throw err;
      }
      let reverse = posts.reverse()
      res.render("posts/index", { 
        posts: reverse, 
        user: req.session.user 
      });
     
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const postInfo = req.body;
    postInfo.user = req.session.user._id;
    const post = new Post(postInfo);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
