const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);

    User.findOne({username: req.body.username}, (err, existingUser) => {
      if (err) {
        throw err;
      }
      if (existingUser == null) {
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/posts");
        });
      } else {
        res.redirect("/users/new");
      }
     
    })

  },
};

module.exports = UsersController;
