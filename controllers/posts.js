const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
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
    console.log("The add controller works!");

    const post_id = req.body.post_id;
    const comment_content = req.body.content;
    const user = req.session.user._id;
    console.log("Post id", post_id, "comment body", comment_content, "user id", user);
    const update = {
      $push: { comment: [{ author: user, content: comment_content }] }
    };

    Post.findOneAndUpdate({ _id: post_id }, update, { new: true, useFindAndModify: false }, (error, data) => {
      if (error) {
        console.log(err);
      } else {
        console.log(data)
      }
    })
    res.status(201).redirect("/posts");

    // (err) => {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   }
    //   res.status(201).redirect("/posts"); 
  }
};

module.exports = PostsController;
