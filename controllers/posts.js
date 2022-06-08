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
  Update: (req, res) => {
    console.log(req.body);
    // let currentDoc = Post.findById(req.body.id);
    Post.updateOne({_id: req.body.id}, {timestamp: req.body.timestamp}, (err, result)=>{
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });
    // currentDoc.save();
  
  },
  Create: (req, res) => {
    console.log(req.body);
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
