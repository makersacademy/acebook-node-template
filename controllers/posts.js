const Post = require("../models/post");
const User = require("../models/user")

const PostsController = {
  Index: async (req, res) => {
    const user  = await User.find()
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), user: user});
      console.log(user);
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
};

module.exports = PostsController;
