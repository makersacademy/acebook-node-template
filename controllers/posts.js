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
  Delete: ("/posts/:id", function(req, res) {
    db.collection('posts').remove({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
      if (err) return console.log(err)
      console.log(req.body)
      res.redirect('/')
    })
  })
};

module.exports = PostsController;
