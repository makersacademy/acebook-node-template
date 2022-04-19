const Post = require("../models/post");
const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      console.log(req.session)
      // '62554beb033329901acdb9d0'
      // '62554beb033329901acdb9d0'
      // console.log(req.session.user.username)
     const user = req.session.user
      res.render("posts/index", { posts: posts, user: user });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    let post = new Post();
    post.message = req.body.message;
    post.username = req.session.user.username
    post.dateAndTime = Date()
    post.likes = []
    console.log(post)

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete: ("/posts/:id", function(req, res) {

    Post.remove({_id: req.params.id}, (err) => {
      if (err) return console.log(err)
      console.log(req.body)
      res.redirect('/posts')
    })
  }),
  Like: ("/posts/like", function(req, res) {
  console.log("got the request")
    console.log(req)
  
  })
};

module.exports = PostsController;

// Make a request to the server that has the User ID and a way of getting the post
// Make a call to the database that updates the likes array by adding/removing the userid
// Reload the page dynamically ideally or with valentina's fast redirect
// Show the number of likes on each post when the page loads