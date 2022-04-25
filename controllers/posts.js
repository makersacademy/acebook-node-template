const Post = require("../models/post");
const User = require("../models/user")

const PostsController = {
  Index: async (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), username: posts.username});
    });
  },
  New: (req, res) => {
    res.render("posts/new");
  },
  Create: (req, res) => {
    const post = new Post({message: req.body.message, username: req.session.user.username})
    post.save((err) => {
      if (err) {
        throw err;
      }
      console.log(req.session.user.username)
      console.log(req.body.message)
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
