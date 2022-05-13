const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find({})
      .sort({ _id: -1 })
      .exec(function (err, userposts) {
        if (err) {
          throw err;
        }

        userposts.forEach((post) =>{
          console.log("post.created:", post.createdAt)
          console.log("typeof post.createdAt:", typeof post.createdAt)
          console.log("reformatted: " + post.createdAt.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric'}))
          // let date = new Date(` ${post.createdAt}`)
          // console.log(date)
          // console.log(typeof date)
          // console.log(date.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric'}))
        })

        res.render("posts/index", {
          posts: userposts,
          date: 'random date'
        });
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
};

module.exports = PostsController;
