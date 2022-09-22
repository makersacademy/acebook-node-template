const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {signedIn: req.body.signedIn});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        // req.flash(err.message, "Email already exists. Please login");
        console.log("-----------we've reached the if statement--------")
        res.redirect("sessions/new");
      }
      else {
        console.log("-----------we've hit the redirect statement--------")
        res.status(201).redirect("/posts"); 
      }
  });
  },
};

module.exports = UsersController;
