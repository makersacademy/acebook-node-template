const User = require("../models/user");
const bcrypt = require("bcrypt");
const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: async (req, res) => {
    console.log("trying to log in");
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    const passwordCorrect = await bcrypt.compare(password, user.password);
    console.log(passwordCorrect);
    if (!user) {
      res.redirect("/sessions/new");
    } else if (!passwordCorrect) {
      res.redirect("/sessions/new");
    } else {
      req.session.user = user;
      res.redirect("/posts");
    }
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
