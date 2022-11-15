const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(email != "" && password != "") {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          const user = new User(req.body);
          user.save((err) => {
            if (err) {
              throw err;
            }
            res.status(201).redirect("/posts");
          });
        } else {
          res.redirect("/users/new");
        }
      });
    } else {
      res.redirect("/users/new");
    }
  },
};

module.exports = UsersController;
