const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
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

  Profile: (req, res) => {
    console.log(req.session.user._id);
    res.render("users/profile", { 
          title: "Acebook",
          name: req.session.user.name,
          username: req.session.user.username,
    });
  },
};

module.exports = UsersController;
