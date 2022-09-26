const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {session: req.session});
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
};

module.exports = UsersController;
