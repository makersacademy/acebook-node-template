const User = require("../models/user");


const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    User.findOne({ email: user.email }, function(err, user) {
      if(err) {
        throw err;
      }
      if(user) {
        throw new Error('This email is already in use, please try again')
      } else {
        user.save((err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/posts");
        });
      }
    });
  },
};

module.exports = UsersController;
