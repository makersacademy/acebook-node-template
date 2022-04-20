const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const user = new User(req.body);

      const doesUsernameExist = await User.findOne({
        username: req.body.username,
      });

      const doesEmailExist = await User.findOne({
        email: req.body.email,
      });

      if (doesEmailExist) {
        res.redirect("/users/new");

      } else if (doesUsernameExist) {
        res.redirect("/users/new");

      } else {
        
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/post");
        });
      }
  },
};

module.exports = UsersController;
