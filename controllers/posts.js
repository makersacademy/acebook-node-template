const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      Comment.find((err, comments) => {
        if(err) {
          throw err;
        }
        comments = comments;
        posts = posts.reverse();
        res.render("posts/index", { posts: posts, comments: comments });
      });
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
