const User = require("../models/user");

const FriendsController = {
  Create: (req, res) => {
    console.log("put request made");
    const friendUsername = req.params.friendUsername;
    const currentUser = req.session.user;
    const newFriendList = currentUser.friends.concat(friendUsername);

    // update currentUser's friend list
    User.updateOne(
      { username: currentUser.username },
      { friends: newFriendList },
      (err) => {
        // do something if there's an error?
        if (err) {
          console.log(err);
        } else {
          req.session.user.friends = newFriendList;
          console.log("user added to friends list");
          console.log(req.session.user);
          res.redirect(303, "/profiles/" + friendUsername);
        }
      }
    );
  },
};

module.exports = FriendsController;
