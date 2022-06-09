const User = require("../models/user");

const UsersController = {
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
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
