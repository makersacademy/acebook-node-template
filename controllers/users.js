const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const user = new User(req.body);

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
          res.status(201).redirect("/post");
        });
      }
  },
};

module.exports = UsersController;
