const Post = require("../models/post");
//const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find()
    .populate("comments")
    .populate("author", "firstName")
    .exec((err, posts) => {
              if (err) {
          throw err;  
        }
      res.render("posts/index", { 
        posts: posts });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
   
  },
  Create: (req, res) => {
    console.log(req.session.user._id)
     const post = new Post({
      message: req.body.message,
      author: req.session.user._id
    });
    post.save((err) => {
      if (err) {
        throw err;
      }
  
      res.status(201).redirect("/posts");
    
    });
  },

  Delete:(req, res) => {
    Post.deleteOne({_id: req.body }, (err, posts) => {
      if (err) {
        throw err;
      }
      

  
     res.status(201).redirect("/posts");
   
   });
 },
};

module.exports = PostsController;
