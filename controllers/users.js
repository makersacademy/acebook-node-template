const session = require("express-session");
const User = require("../models/user");
const Friend = require("../models/friend");
const UsersController = {
<<<<<<< HEAD
  Profile: async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const friendsObject = await Friend.find({ recipient: user.id });
    const friends = await Promise.all(
      friendsObject.map(
        async (friendObject) => await User.findById(friendObject.requester)
      )
    );
    res.render("users/profile", {
      user: user,
      session: req.session,
      friends: friends,
=======
  Profile: (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) {
        throw err;
      }
      res.render("users/profile", {
        user: user,
        session: req.session,
        pageOwnerBool: user.username === req.session.user.username,
      });
>>>>>>> main
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
