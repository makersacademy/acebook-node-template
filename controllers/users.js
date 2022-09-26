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
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
