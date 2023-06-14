const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    // res.render("users/new", {});
    res.render("users/signup", {});

  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      // Updated the code to redirect the user to the login page after successful sign-up.
      // This allows the user to log in and ensures that the navbar dynamically adjusts based on the user's login status.
      res.status(201).redirect("/sessions/login");
    });
  },
};

module.exports = UsersController;
