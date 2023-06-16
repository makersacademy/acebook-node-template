const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const { username, email } = req.body;
    try {
      const usernameExists = await User.findOne({ username: username });
      if (usernameExists) {
        return res
          .status(422)
          .render("users/new", { error: "Username already exists!" });
      }
      const emailExists = await User.findOne({ email: email });
      if (emailExists) {
        return res
          .status(422)
          .render("users/new", { error: "Email already exists!" });
      }
      const user = new User(req.body);
      await user.save();
      return res.status(201).redirect("/sessions/new");
    } catch (error) {
      res.status(400).render("users/new", {
        error: "An error occurred while creating the user.",
      });
    }
  },
};

module.exports = UsersController;
