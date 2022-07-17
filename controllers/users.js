const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { session: req.session });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(201).redirect("/users/new");
      } else {
      res.status(201).redirect("/posts");
      }
    });
  },
};

module.exports = UsersController;
