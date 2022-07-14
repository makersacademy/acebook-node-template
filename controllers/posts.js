const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      console.log('Index')
      console.log(posts)

      res.render("posts/index", { posts: posts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    console.log('Create');
    console.log(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  // implementing a delete function:
  Delete: (req, res) => {
    const post = new Post(req.body);
    Post.findOneAndDelete(post);
  }
};

module.exports = PostsController;
