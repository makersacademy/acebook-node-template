const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find({}, 'message createdAt likes', {sort: {'createdAt': -1}},(err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts });
    }).populate('user');
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const post = new Post({user: req.session.user._id, message: req.body.message});
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  
  Like: (req, res) => {
    Post.findOne({_id: req.body.post_id}, function(err, post) {
      console.log(post.message)
      post.likes = post.likes + 1
      post.save()
      res.status(201).redirect("/posts");
    })
    
  },

};

module.exports = PostsController;
