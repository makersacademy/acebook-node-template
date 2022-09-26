const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    // console.log(req.body.errorMessage)
    const errors = req.session.errors;
    req.session.errors = [];
    res.render("users/new", {signedIn: req.session.signedIn, errors: errors});
  },

  Create: async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).redirect("/posts")
    } catch (err) {
      req.session.errors = []
      for (const [errorType, errorMessage] of Object.entries(err.errors)) {
        req.session.errors.push(errorType.toUpperCase() + " ERROR: " + errorMessage + ".")
      }
      res.redirect("users/new");


      }

  //   user.save((err) => {
  //     console.log(err);
  //     if (err) {
  //       if (err.message === "Email already exists"){
  //         // req.flash(err.message, "Email already exists. Please login");
  //         req.session.errorMessage = err.message
  //       console.log("-----------we've reached the if statement--------")
  //       res.redirect("sessions/new");
  //       }else if (err.message.includes("User validation failed")){
  //         // console.log(err.errors.email.ValidatorError)
  //         console.log(err.message)
  //         req.session.errorMessage = err.message
  //         res.redirect("users/new")
  //       } else {
  //         console.log(err.errors.password.message)
  //         req.session.errorMessage = err.errors.password.message
  //         res.redirect("users/new");
  //       }
  //     }
  //     else {
  //       console.log("-----------we've hit the redirect statement--------")
  //       res.status(201).redirect("/posts");
  //     }
  // });


      }
  };

module.exports = UsersController;
