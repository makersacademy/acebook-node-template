const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      console.log(posts) // delete this line after test
      res.render("posts/index", { posts: posts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    console.log(req.body) // delete this line after testing
    console.log(req._startTime) // delete this line after testing
    const post = new Post(req.body);
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
    Post.deleteOne(post); // Post.deleteOne({message: req.body})
  }
};

module.exports = PostsController;
