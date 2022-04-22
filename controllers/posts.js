const Post = require("../models/post");

const PostsController = {
  // findUsers: User.find((err, allUsers) => {
  //   if (err) {
  //     throw err;
  //   }
  Index: (req, res) => {
    Post.find( async (err, posts) => {
      if (err) {
        throw err;
      }
      const allUsers = await User.find()
      console.log('all users');
      console.log(allUsers)
      console.log(posts);
      const user = req.session.user;
      posts = posts.reverse();
      res.render("posts/index", { posts: posts, user: user, allUsers: allUsers });
    });
  },
  Create: (req, res) => {
    let post = new Post();
    post.message = req.body.message;
    post.username = req.session.user.username;
    post.dateAndTime = Date();
    post.likes = [];
    post.comments;
    post.postImage = req.body.postImage;

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete:
    ("/posts/:id",
    (req, res) => {
      let query = { _id: req.params.id, username: req.session.user.username };

      Post.remove(query, (err) => {
        if (err) {
          console.log(err);
        }
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
