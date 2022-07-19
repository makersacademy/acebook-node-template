const Post = require("../models/post");
//const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find()
    .populate("comments")
    .exec((err, posts) => {
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
