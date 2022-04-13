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
  Comment: (req, res) => {
    const comment = req.body.comment;
    const post_id = req.body.post_id;

    Post.updateOne(
      {'_id': post_id}, // filter - how to find post
      { $push: { comments: comment}}, // update - what to update
      (err, doc) => { // last but not least a callback because nothing works without a callback
        if (err) {
          throw err;
        }
        console.log(doc)
      });
    setTimeout(() => {res.redirect("/posts")}, 100);
  },
};

module.exports = PostsController;
