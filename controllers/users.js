const User = require("../models/user");
const UsersController = {
  Profile: (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) {
        throw err;
      }
      console.log(req.session.user.id);
      res.render("users/profile", {
        user: user,
        session: req.session,
      });
    });
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Search: (req, res) => {
    User.find(
      {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      },
      function (err, users) {
        if (err) {
          throw err;
        }
        res.render("users/search", { users: users });
      }
    );
  },
};

module.exports = UsersController;
