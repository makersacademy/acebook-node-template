const User = require("../models/user");
const Post = require('../models/post');
const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Profile: (req, res) => {
    if (req.session.user && req.cookies.user_sid) { 
      const email = req.session.user.email;
    User.findOne({email: email}, (err, user) => {
      if (err) {
        throw err;
      }
      res.render("users/profile", {user: user});
     });
    }
   },

  //  OtherUser: (req, res) => {
  //   // find the user's data in the database, return one object that matches
  //   User.findOne({email: email}, (err, user) => {
  //     if (err) {
  //       throw err;
  //     }
      
  //     //search for posts made by this user
  //     Post.find({email: email}, (err, user) => {
  //       if (err) {
  //         throw err;
  //       }
        
  //       // pass user data object into view file
  //       // res.render(xxxxxxxxxxxxxxxxxx", {
  //         user: userData,
  //         posts: userPosts,
      
  //       });
  //     });
  //   });
};

module.exports = UsersController;
