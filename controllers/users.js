const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },


  Create: (req, res) => {
    const user = new User(req.body);
    user.save()
      .then(() => {
        res.status(201).redirect("/posts");
      })
      .catch((error) => {
        console.error(error);
        if (error.name === 'MongoError' && error.code === 11000) {
          // Duplicate username or email error
          let errorMsg = '';
          if (error.keyPattern && error.keyPattern.username) {
            errorMsg = 'Username already exists!';
          } else if (error.keyPattern && error.keyPattern.email) {
            errorMsg = 'Email already exists!';
          }
          res.status(422).render("users/new", { error: errorMsg });
        } else {
          // Some other error
          res.status(400).render("users/new", { error: 'An error occurred while creating the user.' });
        }
      });
  },
}

module.exports = UsersController;
