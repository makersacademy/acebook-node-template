const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts, newUser: false });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { newUser: false });
  },
  Update: (req, res) => {
    console.log(req.body);
    Post.findOneAndUpdate(
      {_id: req.body.id},
      {$push:
        {comments: req.body.comments}
      },
      (err, result)=>{
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });  
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
};

module.exports = PostsController;
