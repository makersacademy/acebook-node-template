const Post = require("../models/post");


const PostsController = {

  

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    }).sort( { createdAt: 'desc' } ).exec();
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.user = req.session.user.username
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
