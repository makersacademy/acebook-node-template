const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    console.log('SIGN UP!')
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      // res.status(201).redirect("/posts");
    });

    // log in
    req.session.user = user;
    res.status(201).redirect("/posts");
  },
};

module.exports = UsersController;
