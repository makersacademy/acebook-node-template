
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
      console.log("params", req.params.id) 
      if (err) {
        throw err;
        }            
        res.render("users/:id", { users: users });
    });
  },

  Account: (req, res) => {
    console.log("session ", req.session.user)
    console.log(req.session.user._id)
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
        console.log("users", users)           
        res.render("users/account", { users: users });
      });
    },
  }


module.exports = UsersController;
