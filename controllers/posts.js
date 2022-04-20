const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
   Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts = posts.reverse();
      res.render("posts/index", { posts: posts });
    });
  },

  Create: (req, res) => {
    let post = new Post();
    post.message = req.body.message;
    post.username = req.session.user.username
    post.dateAndTime = Date()
    post.likes = []


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
  })
};

module.exports = PostsController;
