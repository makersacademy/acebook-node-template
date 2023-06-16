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

      console.log("friends_names:", friends_names);
      console.log("nonFriends:", nonFriends);
      console.log("friendRequests:", friendRequests);

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
  
    // Remove the friend from the current user's friends list
    User.findOneAndUpdate(
      { email: currentUser.email },
      { $pull: { friends: friendEmail } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          throw err;
        }
  
        // Remove the current user from the friend's friends list
        User.findOneAndUpdate(
          { email: friendEmail },
          { $pull: { friends: currentUser.email } },
          { new: true },
          (err, updatedFriendUser) => {
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
                  !friends.includes(user.email) &&
                  user.email !== updatedUser.email
              );
  
              console.log("friends_names:", friends_names);
              console.log("nonFriends:", nonFriends);
  
              res.render("profile/index", {
                friends_names: friends_names,
                nonFriends: nonFriends,
              });
            });
          }
        );
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
      { new: true }
    )
      .then((user) => {
        // Update the session with the updated user information
        req.session.user = user;
  
        // Update the friend user's friends list
        return User.findOneAndUpdate(
          { email: friendEmail },
          { $push: { friends: currentUser.email } },
          { new: true }
        );
      })
      .then((updatedFriendUser) => {
        console.log("Updated Friend User:", updatedFriendUser);
  
        // Send a response to the client-side indicating success
        res.json({ success: true });
      })
      .catch((err) => {
        throw err;
      });
  }
  
  
  
  
};

module.exports = ProfileController;