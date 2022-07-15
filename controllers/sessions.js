const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;

    // Find the user in the db that matches with the user in the req.body .
    // compare passwords and redirect depending on the result . 
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log(user);
        user.comparePassword(password, function (matchError, isMatch) {
          if (matchError) {
            console.log(`Error : ${matchError}`);
            res.redirect("/sessions/new");
          } else if (!isMatch) {
            console.log("Passwords did not match");
            res.redirect("/sessions/new");
          } else {
            console.log("successful");
            req.session.user = user;
            res.redirect("/posts");
          }
        });
      }
    });
  },

  Destroy: (req, res) => {
    console.log("logging out");
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie("user_sid");
    }
    res.redirect("/sessions/new");
  },
};

module.exports = SessionsController;
