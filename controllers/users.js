const User = require("../models/user");

const UsersController = {
  Index: (req, res) => {
    const userID = req.params.id;
    User.findById(userID)
      .populate("friends")
      .then((user) => {
        const hasFriends = user.friends.length > 0;
        const isLoggedIn = req.session.user != null;
        const isFriends =
          req.session.user != null
            ? user.friends.some((friend) => friend._id == req.session.user._id)
            : false;
        const isPending =
          req.session.user != null
            ? user.friendRequests.includes(req.session.user._id)
            : false;
        const isNotOwnProfile =
          req.session.user != null
            ? req.session.user._id != req.params.id
            : false;
        res.render("users/index", {
          user: user,
          isLoggedIn: isLoggedIn,
          isFriends: isFriends,
          hasFriends: hasFriends,
          isPending: isPending,
          isNotOwnProfile: isNotOwnProfile,
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
        if (err.name === "MongoError" && err.code === 11000) {
          // Duplicate email
          return res
            .status(422)
            .render("error", { message: "This email already exists" });
        }
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
