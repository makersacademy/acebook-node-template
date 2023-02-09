const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {layout: 'users/new'});
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

  Messages: (req, res) => {
    res.render("users/messages")
  },

  Friends: (req, res) => {
    res.render("users/friends")
  },

  Notifications: (req, res) => {
    res.render("users/notifications")
  },

  Profile: (req, res) => {
    res.render("users/profile")
  },
};

module.exports = UsersController;
