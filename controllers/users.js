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
    // code goes here!
    console.log("this has worked");
    res.send(req.params.userId);
  },
};

module.exports = UsersController;
