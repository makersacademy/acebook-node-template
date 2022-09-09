const Post = require("../models/post");

const PostsController = {
  Like: async (req, res) => {
    const postID = req.body.post
    const result = await Post.find({ _id: postID });
    const post = result[0]
    post.likes.push(req.body.user);
    await post.save();
    res.status(201).redirect("/posts");
  },

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        name: req.session.user.firstName,
        userID: req.session.user._id
      });
    });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    if (post.message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
        });
      });
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }
  },
};

module.exports = PostsController;
