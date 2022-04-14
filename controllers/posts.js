const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find({}).sort({date: -1}).exec((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {session: req.session});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Update: (req, res) => {
    Post.findByIdAndUpdate( req.body.id, {$inc:{likes:1}} ).exec((err, post) => {
      if (err) {
        throw err;
      }

      //redirect back to the previous page 
    });
  }
};

module.exports = PostsController;
