const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    console.log(req.messages);
    res.render("users/new", { messages: req.locals });
  },

  Create: (req, res) => {
    try {
      const user = new User(req.body);
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/sessions/new");
      });
    } catch (err) {
      if (err.code === 11000) {
        res.flash("errors", `${err.keyValue.email} is already in use`);
        res.redirect("/users/new");
      }
    }
  },
};

module.exports = UsersController;
