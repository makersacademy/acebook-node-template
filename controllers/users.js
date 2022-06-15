const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {
      session: req.session.user,
      error: req.flash("error"),
    });
  },

  Create: (req, res) => {
    const user = new User(req.body);

    user
      .save()

      .then(() => {
        res.status(201).redirect("/sessions/new");
      })

      .catch((err) => {
        if (err.code === 11000) req.flash("error", "Email already exists");

        res.redirect("/users/new");
      });
  },
};

module.exports = UsersController;
