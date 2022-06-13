const User = require("../models/user");

const UsersController = {

  Index: (req, res) => {
    console.log(req.session.userName);
    res.render("users/profile", { userName: req.session.userName });
  },

  New: (req, res) => {
    res.render("users/new", { newUser: true });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user; // login in user straight away after sign up and redirect to posts page
      req.session.userID = user._id;
      req.session.userName = user.userName;
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
