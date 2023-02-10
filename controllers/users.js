const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {layout: 'users/new'});
  },

  Create: (req, res) => {
    if (req.body.password == req.body.confirm_password) {
      const user = new User(req.body); 
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    } else {
      res.redirect("/users/new");
    }
  },
};

module.exports = UsersController;
