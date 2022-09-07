// const Friend = require("../models/friend");
const User = require("../models/user");

const FriendsController = {
  Create: (req, res) => {
    const friendUsername = req.params.friendUsername;
    const currentUser = req.session.user;
    const newFriendList = currentUser.friends.concat(friendUsername);
    console.log(newFriendList);

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
          // res.redirect("/profiles/" + friendUsername);
          res.send("hello");
        }
      }
    );
  },
};

// Model.updateOne({ name: FINDBYNAME }, { ship: UPDATETO });

module.exports = FriendsController;
