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
    const query = { _id: req.params.id, username: req.session.user.username }

    Post.remove(query, (err) => {
      if (err) return console.log(err)
      console.log(req.body)
      res.redirect('/posts')
    })
  })
};

module.exports = PostsController;
