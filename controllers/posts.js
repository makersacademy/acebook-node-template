const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts, userid: req.session.user._id });
    });
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post({userObjectId: req.session.user._id, message: req.body.message});
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

// module.exports.getPostByUserId = (id, callback) => {
//   message.find({userId: id}, callback)
//   .populate('userId');
// }

module.exports = PostsController;
