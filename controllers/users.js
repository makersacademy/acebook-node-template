const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { error: req.flash("error") });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.email = req.body.email;
    user.password = req.body.password;
    user.username = req.body.username;

    user.save((err) => {
      if (err) {
        if (err.name === "ValidationError") {
          req.flash("error", "Email/Username in use");
          res.redirect("/users/new");
        }
        else {
          throw err;
        }
      } else {
        res.status(201).redirect("/posts");
      }
    });
  },
};

module.exports = UsersController;
