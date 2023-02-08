const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    }).sort({date:-1});
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.date = Date.now();
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
 
   Like: (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id

    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      if (!post.liked_by.includes(userId)) {
        post.likes = post.likes + 1;
        post.liked_by.push(userId)

        post.save((err) => {
          if (err) {
            throw err;
          }
        });
      }
      res.redirect("/posts");
    });
  },
};

module.exports = PostsController;
