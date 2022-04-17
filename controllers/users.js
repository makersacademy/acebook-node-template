const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const user = new User(req.body);

    const userExists = await User.exists({email: user.email})

    if (userExists == false) {
      user.save((err) => {
        if (err) {
          throw err;
        }
      });
      res.redirect("/sessions/new");
    } else {
      // ideally have an else statement that triggers an error to pop up letting the user know 
      // the email is in use and to use another email in an else branch 
      res.redirect("/users/new")
    }

  },
};

module.exports = UsersController;
