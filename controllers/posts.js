const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts });
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
  Delete: ("/posts/:id", function(req, res, next) {
  
    // Post.findByIdAndDelete(req.params.id)
    Post.deleteOne({message: 'hi'})
    console.log("Helloooo!")
    .then(() => {
      res.redirect('/posts');
      })
   .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  })
  console.log(req.params.id);
  })
};

module.exports = PostsController;
