const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    // console.log(req.body.errorMessage)
    res.render("users/new", {signedIn: req.body.signedIn, errorMessage: req.session.errorMessage});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      console.log(err);
      if (err) {
        if (err.message === "Email already exists"){
          // req.flash(err.message, "Email already exists. Please login");
          req.session.errorMessage = err.message
        console.log("-----------we've reached the if statement--------")
        res.redirect("sessions/new");
        }else if (err.message === "User validation failed"){
          console.log(err.errors.email.VallidatorError)
        } else {
          console.log(err.errors.password.message)
          req.session.errorMessage = err.errors.password.message
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
