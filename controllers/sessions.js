const User = require("../models/user");
const bcrypt = require("bcrypt");

const SessionsController = {
  New: (req, res) => {
    res.render("sessions/new", {});
  },

  Create: async (req, res) => {
    // new
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      req.session.user = user;

      // check that the user password with the
      // hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).redirect("/posts");
      } else {
        res.status(400).redirect("/sessions/new");
      }
    } else {
      res.status(401).redirect("/sessions/new");
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
