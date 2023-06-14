const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  //Hash password

  Create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (existingUser) {
        // A user with the same email address already exists.
        res
          .status(400)
          .render("users/new", { error: "Email address already taken" });
      } else {
        // Validate the first name to check for punctuation
        const firstName = req.body.firstName;
        const hasFirstNamePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
          firstName
        );

        // Validate the last name to check for punctuation
        const lastName = req.body.lastName;
        const hasLastNamePunctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(
          lastName
        );

        if (hasFirstNamePunctuation) {
          res
            .status(400)
            .render("users/new", {
              error: "First name should not contain punctuation",
            });
        } else if (hasLastNamePunctuation) {
          res
            .status(400)
            .render("users/new", {
              error: "Last name should not contain punctuation",
            });
        } else {
          const user = new User(req.body);
          user.save((err) => {
            if (err) {
              res.status(500).render("users/new", { error: err.message });
            } else {
              // Create session for new user
              req.session.user = user;
              res.status(201).redirect("/posts"); // Add confirmation message
            }
          });
        }
      }
    });
  },
};

module.exports = UsersController;