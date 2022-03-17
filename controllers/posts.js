const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post
    .find( (err, posts) => {
      if (err) {
        throw err;
      }
      
      posts.forEach((post) => {
        post.postedAt = post.createdAt.toLocaleString();
      })

      res.render("posts/index", { posts: posts });
    })
    .sort({createdAt: -1 });
    
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    //req.body.posted_by = req.session.user._id;
    req.body.posted_by = req.session.user.email;
    req.body.likes = 0;
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
