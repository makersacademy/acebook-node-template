const Post = require("../models/post");
// const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    // const user = req.session.user;
    // console.log(user);
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), username: req.session.user.username,
      });
      console.log(req.session.user)
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
  User_posts: (req, res) => {
    res.render("posts/myposts");
  }
};

module.exports = PostsController;
