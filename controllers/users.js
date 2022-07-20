const User = require("../models/user");
const Post = require('../models/post');

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { session: req.session });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        console.log(err);
        res.status(409).render("users/new", { error: 'User already exists!' });
      } else {
      res.status(201).redirect("/posts");
      }
    });
  },

  SelfProfile: (req, res) => {
    console.log(req.body)
    const accountEmail = req.session.user.email;
    Post.find({user: accountEmail}, (err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse() // reorders posts, so newest post is always at the top of the list
      res.render("users/profile", {posts: posts, email: accountEmail, session: req.session});
    });
  },
  ShowProfile: (req, res) => {
    console.log(req.session);
    console.log(req.body);
    Post.find({user: req.body.email}, (err, posts) => {
      if (err) {
        throw err;
      } else {
      posts.reverse() // reorders posts, so newest post is always at the top of the list
      console.log(posts);
      res.render("users/profile", {posts: posts, email: req.body.email, session: req.session});
      }
    })
  }
};

module.exports = UsersController;
