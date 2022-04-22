const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts.reverse(), user: req.session.user });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { user: req.session.user });
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
  Delete: async (req, res) => {
    try {
      const deletePost = Post.findById(req.params.id);
      //console.log(`userdid: ${userId}`)
      //console.log(Object.values(deletePost));
      if (deletePost.userId === req.session._id) {
        await deletePost.deleteOne();
        res.status(200).redirect("/posts");
      } else {
        res.status(403).json("You cannot delete this post");
      }
    } catch (err) {
    res.status(500).json(err);
    }
  } 
}

module.exports = PostsController;
