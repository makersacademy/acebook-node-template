const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);

    // check if user exists before creating
    User.findOne({ email: user.email }).then((found) => {
      if (found) {
        console.log(`User ${found.email} already exists!`);
        res.redirect("/");

        // temp ***
        // req.session.user = found;
        // res.status(201).redirect("/posts");

      } else {
        user.save((err) => {
          if (err) {
            throw err;
          }

          // log in automatically after signup
          req.session.user = user;
          res.status(201).redirect("/posts");
        });
      }
    });
  },
};

module.exports = UsersController;
