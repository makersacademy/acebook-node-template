const User = require("../models/user");

const SessionsController = {
  New: (req, res) => {
    //specifies a specific layout to avoid displaying universal navbar in layout.hbs
    res.render("sessions/new", {layout: 'sessions/new'});
  },

  Create: (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.render("sessions/new", { layout: "sessions/new", error: "incorrect email"});
      } else if (user.password != password) {
        res.render("sessions/new", {layout: "sessions/new", error: "incorrect password"});
      } else {
        req.session.user = user;
        res.redirect("/posts");
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
