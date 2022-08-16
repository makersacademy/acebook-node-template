const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      console.log(req.session);
      res.render("posts/index", {
        posts: posts,
        session: req.session,
      });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
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
  AddComment: (req, res) => {
    const post_id = req.body.post_id;
    const comment_content = req.body.content;
    const user = req.session.user._id;
    const update = {
      $push: { comment: [{ author: user, content: comment_content }] },
    };

    Post.findOneAndUpdate(
      { _id: post_id },
      update,
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    );
    res.status(201).redirect("/posts");
  },
};

module.exports = PostsController;
