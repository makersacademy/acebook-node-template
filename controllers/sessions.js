const User = require("../models/user");
const bcrypt = require("bcrypt");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;
    console.log("password entered:", password);

    User.findOne({ email: email })
      .select("+password")
      .then(async (user) => {
        if (!user) {
          res.render("sessions/new", { error: "User not found" });
        } else {
          const match = await bcrypt.compare(password, user.password);

          if (!match) {
            res.render("sessions/new", { error: "Incorrect password" });
          } else {
            req.session.user = user;
            req.flash("success", "You are now signed in!");
            res.redirect("/posts");
          }
        }
      });
  },

  Destroy: (req, res) => {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie("user_sid");
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  },
};

module.exports = SessionsController;
