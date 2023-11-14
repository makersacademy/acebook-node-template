const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { title: "Acebook" });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    console.log('user:', user)
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
