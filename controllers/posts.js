const Post = require("../models/post");
const Image = require('../models/user');

const PostsController = {
  Index: (req, res) => {
    Post
    .find( (err, posts) => {
      if (err) {
        throw err;
      }
      
      posts.forEach((post) => {
        post.postedAt = post.createdAt.toLocaleString();
      })

      res.render("posts/index", { posts: posts,
          title: "Acebook",
          name: req.session.user.name,
          username: req.session.user.username,
          image: req.session.user.image
      });
    }).populate('user')
      .sort({createdAt: -1 }) 
      .exec(function(err, posts) {
        if(err) throw err;
        posts.forEach((post) => {
          console.log(post.user.name);
        })
      })
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    req.body.user = req.session.user._id;
    req.body.posted_by = req.session.user.email;
    req.body.likes = 0;
    //req.body.comments = {};
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Test: (req, res) => {
    res.send("Here")
  },
  Like: (req, res) => {
    Post
    .findOneAndUpdate(
      {_id: req.body.postId}, {$inc:{likes: 1}}, {new: true},
      (err) => {
      if (err) {
        throw err;
      }
      //console.log(update);
      res.status(201).redirect("/posts")
    });

  },
  Comment: (req, res) => {
    console.log(req.body)
    Post
    .findOneAndUpdate(
      {_id: req.body.postId},
      { $push: {
        comments: {
          user: req.session.user.name,
          comment: req.body.comment
          }
      }
      },
      {new: true},
      (err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts")
    });
  }
};

module.exports = PostsController;
