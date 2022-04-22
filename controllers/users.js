const User = require("../models/user");
const bcrypt = require('bcrypt');

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

      const doesUsernameExist = await User.findOne({
        username: req.body.username,
      });

      const doesEmailExist = await User.findOne({
        email: req.body.email,
      });

      if (doesEmailExist) {
        req.session.message = {
          type: 'danger',
          intro: 'EMAIL EXISTS, PUNKASS ',
          message: 'You are one stupid duck'
        }
        res.redirect("/users/new");

      } else if (doesUsernameExist) {
        req.session.message = {
          type: 'danger',
          intro: 'THIS USERNAME EXISTS, YOU CLOWN',
          message: 'Bad duck'
        }
        res.redirect("/users/new");

      } else {
        
        user.save((err) => {
          if (err) {
            throw err;
          }
          req.session.user = user;
          res.status(201).redirect("/posts");
        });
      }
  },
};

module.exports = UsersController;

