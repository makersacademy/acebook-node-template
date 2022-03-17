const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        return res.redirect('users/new');
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
