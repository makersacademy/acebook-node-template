const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    const currentUser = req.session.user;

    User.find({}, (err, allUsers) => {
      if (err) {
        throw err;
      }

      const friends = currentUser.friends;
      const friends_names = allUsers.filter((user) => friends.includes(user.email));
      const nonFriends = allUsers.filter(
        (user) => !friends.includes(user.email) && user.email !== currentUser.email
      );

      res.render("profile/index", { friends_names: friends_names, nonFriends: nonFriends });
    });
  },

  RemoveFriend: (req, res) => {
    const currentUser = req.session.user;
    const friendEmail = req.body.friendEmail;

    User.findOneAndUpdate(
      { email: currentUser.email },
      { $pull: { friends: friendEmail } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          throw err;
        }

        // Re-query the user data with updated friends list
        User.find({}, (err, allUsers) => {
          if (err) {
            throw err;
          }

          const friends = updatedUser.friends;
          const friends_names = allUsers.filter((user) => friends.includes(user.email));
          const nonFriends = allUsers.filter(
            (user) => !friends.includes(user.email) && user.email !== updatedUser.email
          );

          res.render("profile/index", { friends_names: friends_names, nonFriends: nonFriends });
        });
      }
    );
  },

  AddFriend: (req, res) => {
    const currentUser = req.session.user;
    const friendEmail = req.body.friendEmail;

    User.findOneAndUpdate(
      { email: currentUser.email },
      { $push: { friends: friendEmail } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          throw err;
        }

        // Re-query the user data with updated friends list
        User.find({}, (err, allUsers) => {
          if (err) {
            throw err;
          }

          const friends = updatedUser.friends;
          const friends_names = allUsers.filter((user) => friends.includes(user.email));
          const nonFriends = allUsers.filter(
            (user) => !friends.includes(user.email) && user.email !== updatedUser.email
          );

          res.render("profile/index", { friends_names: friends_names, nonFriends: nonFriends });
        });
      }
    );
  },
};

module.exports = ProfileController;