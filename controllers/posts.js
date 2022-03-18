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
    console.log(req.user)
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  
  // Like: (req, res) => {
  //   const post = Post.findOneAndUpdate({_id: req.body.id}, function(like){
  //     if
  //   }) 
  // }

};

module.exports = PostsController;
