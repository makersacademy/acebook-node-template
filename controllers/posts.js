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
  Likes: (req, res) => {
    console.log("does this work")
    const post = Post.find({message: req.body.message })
    console.log(post)
    post.likes += 1
    res.status(201).redirect("/posts");
    // post.overwrite({"likes": post.likes +1})
    // post.save((err) => {
    
    //   if (err) {
    //     throw err;
    //   }
    //   res.status(201).redirect("/posts");
    // });
  }};

module.exports = PostsController;
