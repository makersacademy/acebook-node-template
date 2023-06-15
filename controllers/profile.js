const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    const currentUser = req.session.user;

    User.find({}, (err, allUsers) => {
      if (err) {
        throw err;
      }

      const friends = currentUser.friends;
      const friends_names = allUsers.filter((user) =>
        friends.includes(user.email)
      );
      const nonFriends = allUsers.filter(
        (user) =>
          !friends.includes(user.email) && user.email !== currentUser.email
      );

      const friendRequests = allUsers.filter((user) =>
        currentUser.friendRequests.includes(user.email)
      );

      res.render("profile/index", {
        friends_names: friends_names,
        nonFriends: nonFriends,
        friendRequests: friendRequests, // Add friendRequests to the template data
      });
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
          const friends_names = allUsers.filter((user) =>
            friends.includes(user.email)
          );
          const nonFriends = allUsers.filter(
            (user) =>
              !friends.includes(user.email) && user.email !== updatedUser.email
          );

          res.render("profile/index", {
            friends_names: friends_names,
            nonFriends: nonFriends,
          });
        });
      }
    );
  },

  AddFriend: (req, res) => {
    const currentUser = req.session.user;
    const friendEmail = req.body.friendEmail;

    User.findOne({ email: friendEmail }, (err, friendUser) => {
      if (err) {
        throw err;
      }

      if (!friendUser) {
        res.json({ message: "User not found" });
      }

      // Check if friend request already exists
      if (friendUser.friendRequests.includes(currentUser.email)) {
        res.json({ message: "Friend request already sent" });
      }

      // Add friend request to the recipient's friendRequests array
      friendUser.friendRequests.push(currentUser.email);
      friendUser.save((err) => {
        if (err) {
          throw err;
        }

        res.json({ message: "Friend request sent" });
      });
    });
  },

  AcceptFriendRequest: (req, res) => {
    const currentUser = req.session.user;
    const friendEmail = req.body.friendEmail;
  
    User.findOneAndUpdate(
      { email: currentUser.email },
      {
        $pull: { friendRequests: friendEmail },
        $push: { friends: friendEmail },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          throw err;
        }
  
        // Update the friend user's friends list
        User.findOneAndUpdate(
          { email: friendEmail },
          { $push: { friends: currentUser.email } },
          { new: true },
          (err, updatedFriendUser) => {
            if (err) {
              throw err;
            }
  
            res.json({ message: "Friend request accepted", updatedUser, updatedFriendUser });
          }
        );
      }
    );
  },
  
  

};

module.exports = ProfileController;
