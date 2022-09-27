const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    console.log("We are here 1")
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), signedIn: req.session.signedIn});
    });
  },
  New: (req, res) => {
    res.render("posts/new", {signedIn: req.session.signedIn});
  },
  Create: (req, res) => {
    req.body.username = req.session.user.username;
    req.body.likes = 0;
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Like: async (req, res) => {
    console.log("Bonjour")
    var postId = req.params.postId;
    await Post.findByIdAndUpdate(postId, {$inc:{likes: 1}}).exec()
    res.redirect('back');
    }
  }

module.exports = PostsController;
