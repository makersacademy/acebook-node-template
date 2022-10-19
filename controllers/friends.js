const User = require("../models/user");

const FriendsController = {
  Accept: async (req, res) => {
    await User.updateOne(
      { _id: req.session.user._id },
      { $addToSet: { friends: req.body.requester } }
    ).catch((err) => {
      console.log(err);
    });
    await User.updateOne(
      { _id: req.session.user._id }
      // { $addToSet: { friends: req.body.requester } }
    ).catch((err) => {
      throw err;
    });
    //remove the requester id from req.body.requester from the user.friendRequests
    res.redirect("/settings");
  },
  Decline: (req, res) => {
    //updateOne
    //find user with req.session.user._id
    //remove the requester id from req.body.requester from the user.friendRequests
    res.redirect("/settings");
  },
};

module.exports = FriendsController;
