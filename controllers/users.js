const User = require("../models/user");
const SessionsController = require("../controllers/sessions");
const bcrypt = require("bcryptjs");
const UsersController = {

  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const { email, firstName, lastName, password, confirmPassword, icon } = req.body;
    const maxLength = 50;
    if (firstName.length > maxLength) {
      return res.status(400).render("users/new", {
        error: "First name exceeds the character limit",
      });
    }

    if (lastName.length > maxLength) {
      return res.status(400).render("users/new", {
        error: "Last name exceeds the character limit",
      });
    }
    
    // Validate the first name to check for punctuation
    const hasFirstNamePunctuation = /[!"#$%&()*+,/:;<=>?@[\]^_`{|}~]/.test(firstName);

    // Validate the last name to check for punctuation
    const hasLastNamePunctuation = /[!"#$%&()*+,/:;<=>?@[\]^_`{|}~]/.test(lastName);

    // Display error messages if names contain punctuation
    if (hasFirstNamePunctuation && !firstName.includes("-") && /[^\p{L}\-]/u.test(firstName)) {
      return res.status(400).render("users/new", {
        error: "First name should not contain punctuation (except dashes, apostrophes and periods)",
      });
    } else if (hasLastNamePunctuation && !lastName.includes("-") && /[^\p{L}\-]/u.test(lastName)) {
      return res.status(400).render("users/new", {
        error: "Last name should not contain punctuation (except dashes, apostrophes and periods)",
      });
    }

    // Password validation
    const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
      password
    );

    if (!isPasswordValid) {
      return res.status(400).render("users/new", {
        error:
          "Password is not valid. Passwords must contain at least 8 characters, a number, and a special character",
      });
    }

    // Confirm password
    if (password !== confirmPassword) {
      return res.status(400).render("users/new", {
        error: "Passwords did not match",
      });
    }

    // Check email is unique
    User.findOne({ email: email }, (err, existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .render("users/new", { error: "Email address already taken" });
      }

      // Hash password using bcryptjs
      const saltRounds = 10; // Increase this value for better security, but slower performance
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          return res.status(500).render("users/new", { error: err.message });
        }
        
        const user = new User({
          email,
          firstName,
          lastName,
          password: hashedPassword,
          icon: icon
        });

        user.save((err) => {
          if (err) {
            return res.status(500).render("users/new", { error: err.message });
          }

          // Successful sign up redirects to /posts page
          req.session.user = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            icon: user.icon
          };
          res.status(201).redirect("/posts");
        });
      });
    });
  },
};
module.exports = UsersController;