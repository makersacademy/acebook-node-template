const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate({path: "user", select: "email"}).populate({path : "comments", select: "message"}).exec((err, posts) => {
      if (err) {
        throw err;
      }
      let reverse = posts.reverse()
      res.render("posts/index", { 
        posts: reverse, 
        user: req.session.user
      });
     
    });
  },
  New: (req, res) => {
    res.render("posts/new", {user: req.session.user});
  },
  Create: (req, res) => {
    const postInfo = req.body;
    postInfo.user = req.session.user._id;
    const post = new Post(postInfo);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  }, 
  IncreaseLikes: (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, {
      "$inc" : { "likesCount" : 1 },
      "$push": { "likesBy": req.session.user.email }
    }).exec((err, post) => {
      if (err) res.json(err);
      else res.status(201).redirect(`/posts`);
    })
  },
  DecreaseLikes: (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, {
      "$inc" : { "likesCount" : -1 },
      "$pull": { "likesBy": req.session.user.email }
    }).exec((err, post) => {
      if (err) res.json(err);
      else res.status(201).redirect(`/posts`);
    })
  },
  LikedBy: (req, res) => {
    Post.findOne({_id: req.params.id}).exec((err, post) => {
      if (err) {
        throw err;
      }
      res.render("posts/id", { 
        post: post,
        user: req.session.user 
      });
    })
  },
  Delete: (req, res) => {
    Post.findByIdAndRemove(req.params.id, 
      function(err, docs) {
        if(err) res.json(err);
        else res.status(201).redirect("/posts");
      })
  }
}  
       

module.exports = PostsController;
