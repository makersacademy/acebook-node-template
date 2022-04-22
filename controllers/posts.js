const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse() });
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
  Comments: (req, res) => {
    Post.find((err, posts) => {
      if(err) {
        throw err;
      }
      res.render("posts/comments", {comments: posts.comments });
    })
  }
};

module.exports = PostsController;
