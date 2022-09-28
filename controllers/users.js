
const session = require("express-session");
const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    if (req.session.user && req.cookies.user_sid){
      res.render("users/new", {session: req.session, userLoggedIn: true});
    }
    else {
      res.render("users/new", {session: req.session});
    }
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (!err) {
        res.status(201).redirect("/sessions/new");
      }
      else {
        res.redirect("/signuperror");
      }
    });
  },

  Profile: (req, res) => {
    User.findOne({ _id: req.params.id })
    .populate({
      path: "posts",
      populate: {
        path: "comments",
        model: 'Comment'
      }
    })  
    .exec((err, users) => {
      if (err) {
        throw err;
        }            
        res.render("users/:id", { users: users, userLoggedIn: true });
    });
  },

  Account: (req, res) => {
    User.findOne({_id: req.session.user._id})
    .populate({
      path: "posts",
      populate: {
        path: "comments",
        model: 'Comment'
      }
    })      
    .exec((err, users) => {
      if (err) {
        throw err;
        }           
        res.render("users/account", { users: users, userLoggedIn: true });
      });
    },

  Edit: (req, res) => {
    if (req.session.user && req.cookies.user_sid){
      res.render("users/editmyprofile", {session: req.session, userLoggedIn: true});
    }
    else {
      res.render("users/editmyprofile", {session: req.session});
    }
  },
  Update: async(req, res) => {
    console.log(req.session.user)
    var user = await User.findOneAndUpdate({_id: req.session.user._id}, {$set: {bio: req.body.bio, location: req.body.location, age: req.body.age}})
    user.save((err) => {
      if (!err) {
        res.status(201).redirect("/users/account");
      }
      else {
        res.redirect("/users/editmyprofile");
      }
    });
    console.log(req.session.user)
  },
  }
  
module.exports = UsersController;
