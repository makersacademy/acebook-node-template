const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const user = req.session.user;
      posts = posts.reverse();
      res.render("posts/index", { posts: posts, user: user });
    });
  },
  Create: (req, res) => {
    let post = new Post();
    post.message = req.body.message;
    post.username = req.session.user.username;
    post.dateAndTime = Date();
    post.likes = [];
    post.comments;

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete:
    ("/posts/:id",
    function (req, res) {
      Post.remove({ _id: req.params.id }, (err) => {
        if (err) return console.log(err);
        console.log(req.body);
        res.redirect("/posts");
      });
    }),
  Like:
    ("/posts/like",
    function (req, res) {
      console.log("got the request");
      console.log(req);
      res.redirect("/posts");
    }),
};

module.exports = PostsController;

// Make a request to the server that has the User ID and a way of getting the post
// Make a call to the database that updates the likes array by adding/removing the userid
// Reload the page dynamically ideally or with valentina's fast redirect
// Show the number of likes on each post when the page loads
