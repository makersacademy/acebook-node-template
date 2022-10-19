const User = require("../models/user");

const FriendsController = {
  Accept: async (req, res) => {
    await User.updateOne(
      { _id: req.session.user._id },
      { 
        $addToSet: { friends: req.body.requester },
        $pull: { friendRequests: req.body.requester }
      },
    ).catch((err) => {
      console.log(err);
    });
    res.redirect("/settings");
  },

  Decline: async (req, res) => {
    await User.updateOne(
      { _id: req.session.user._id },
      { 
        $pull: { friendRequests: req.body.requester }
      },
    ).catch((err) => {
      console.log(err);
    });
    res.redirect("/settings");
  },
};

module.exports = FriendsController;
