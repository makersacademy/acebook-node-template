const User = require("../models/user");

const UsersController = {
  Index: (req, res) => {
    User.findById(req.session.user._id, (err, user) => {
      if (err) {
        throw err;
      }
      res.render("users/index", { user: user, username: req.params.username });
    });
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        throw err;
      }
      console.log("printing userid", user.id);
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
