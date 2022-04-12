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
        res.status(201).redirect("/posts");
      });
    } else {
      // should flash an error message back to the user
      res.redirect("/users/new");
      console.log('Error goes here')
    }
  },
};

module.exports = UsersController;
