const User = require("../models/user");
const Post = require('../models/post');

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { session: req.session });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err, result) => {
      if (err) {
        console.log(err);
      } else if (result) {
        res.status(409).render("users/new", { 
          error: 'User already exists!', 
          name: req.name, 
          surname: req.surname});
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
      const userPosts = posts.reverse() // reorders posts, so newest post is always at the top of the list
      Post.find({recipient: req.body.email}, (err, posts) => {
        console.log(posts);
        const wallPosts = posts.reverse();
        res.render("users/profile", {posts: userPosts, wallPosts: wallPosts, email: req.body.email, session: req.session});
      })}
    })
  }
};

module.exports = UsersController;
