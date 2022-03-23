const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find({}, 'message createdAt likes', {sort: {'createdAt': -1}},(err, posts) => {
      if (err) {
        throw err;
      }
      console.log(posts[0])
      res.render("posts/index", { posts: posts });
    }).populate('user').populate({path: "comments", populate: {path: 'user'}});
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
  
  // Like: (req, res) => {
  //   const post = Post.findOneAndUpdate({_id: req.body.id}, function(like){
  //     if
  //   }) 
  // }

};

module.exports = PostsController;
