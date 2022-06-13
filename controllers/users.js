const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    // const user = new User(req.body);
    // console.log("Emaaaaaaaaaail")
    try {
      const user = new User(req.body);
      user.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/sessions/new");
      });
    } catch(err) {
      console.log("Email must be unique")
    }
  },
};

module.exports = UsersController;
