const User = require("../models/user");

const FriendsController = {
  Request: async (req, res) => {
    await User.updateOne(
      { _id: req.body.requestee },
      {
        $addToSet: { friendRequests: req.session.user._id },
      }
    ).catch((err) => {
      console.log(err);
    });
    res.redirect(`/users/${req.body.requestee}`);
  },

  Accept: async (req, res) => {
    await User.updateOne(
      { _id: req.session.user._id },
      {
        $addToSet: { friends: req.body.requester },
        $pull: { friendRequests: req.body.requester },
      }
    ).catch((err) => {
      console.log(err);
    });
    await User.updateOne(
      { _id: req.body.requester },
      {
        $addToSet: { friends: req.session.user._id },
      }
    );
    res.redirect("/settings");
  },

  Decline: async (req, res) => {
    await User.updateOne(
      { _id: req.session.user._id },
      {
        $pull: { friendRequests: req.body.requester },
      }
    ).catch((err) => {
      console.log(err);
    });
    res.redirect("/settings");
  },
};

module.exports = FriendsController;
