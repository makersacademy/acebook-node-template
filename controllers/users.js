const User = require("../models/user");
const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("sessions/new");
    });
  },
  Profile: (req, res) => {
    if (req.session.user) {
      const email = req.session.user.email;
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          throw err;
        }
        res.render("users/profile", { user: user });
      });
    }
  },
};

module.exports = UsersController;
