const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    console.log(User(req.body))
    user.save((err) => {
      if (err) {
        console.log("*** Email already exists, redirecting user to users/new ***")
        //throw err;
        res.redirect("/users/new");
      } else { res.status(201).redirect("/posts"); }
      
    });
  },
};

module.exports = UsersController;
