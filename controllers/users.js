const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    console.log(req.body.errorMessage)
    res.render("users/new", {signedIn: req.body.signedIn, errorMessage: req.body.errorMessage});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        if (err.message === "Email already exists"){
          // req.flash(err.message, "Email already exists. Please login");
        console.log("-----------we've reached the if statement--------")
        res.redirect("sessions/new");
        } else {
          console.log(err.errors.password.message)
          req.body.errorMessage = err.errors.password.message
          res.redirect("users/new");
        }
      }
      else {
        console.log("-----------we've hit the redirect statement--------")
        res.status(201).redirect("/posts"); 
      }
  });
  },
};

module.exports = UsersController;
