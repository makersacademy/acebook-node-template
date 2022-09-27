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
    console.log(req.session.user)
    User.find(req.session.user.id).populate("users").exec((err, users, posts) => {
      if (err) {
        throw err;
        }            
        res.render("users/profile", { users: users, posts: posts, userLoggedIn: true});
      });
    },
  }
module.exports = UsersController;
