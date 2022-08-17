const Friend = require("../models/friend");
const User = require("../models/user");
const FriendsController = {
  Add: (req, res) => {
    const friendship = new Friend({
      requester: req.session.user._id,
      recipient: req.body.content,
      status: 0,
    });
    friendship.save((err) => {
      if (err) {
        throw err;
      }
    });
    res.status(201).redirect("/");
  },

  Accept: async (req, res) => {
    await Friend.findOneAndUpdate(
      { recipient: req.session.user._id, requester: req.params.id },
      { status: 1 }
    );
    res.status(201).redirect(`/users/profile/${req.session.user.username}`);
  },

  Delete: async (req, res) => {
    await Friend.findOneAndDelete(
      { recipient: req.session.user._id, requester: req.params.id },
      { status: 1 }
    );

    await Friend.findOneAndDelete(
      { recipient: req.params.id, requester: req.session.user._id},
      { status: 1 }
    );

    res.status(201).redirect(`/friends`);
  },

  Index: async (req, res) => {
    const user = req.session.user;
    const requestsToMeObjects = await Friend.find({
      recipient: user._id,
      status: 0,
    });
    const requestsFromMeObject = await Friend.find({
      requester: user._id,
      status: 0,
    });
    const friendsObject = await Friend.find({
      $or: [
        { recipient: user._id, status: 1 },
        { requester: user._id, status: 1 },
      ],
    });
    //Gets all friend Requests
    const requestsToMe = await Promise.all(
      requestsToMeObjects.map(
        async (requestObject) => await User.findById(requestObject.requester)
      )
    );
    const requestsFromMe = await Promise.all(
      requestsFromMeObject.map(
        async (requestObject) => await User.findById(requestObject.recipient)
      )
    );
    // Gets all current Friends
    const friends = await Promise.all(
      friendsObject.map(async (friendObject) => {
        if (friendObject.recipient == user._id) {
          const user = await User.findById(friendObject.requester);
          return user;
        } else {
          const user = await User.findById(friendObject.recipient);
          return user;
        }
      })
    );
    res.render("friends/index", {
      user: user,
      session: req.session,
      friends: friends,
      requestsToMe: requestsToMe,
      requestsFromMe: requestsFromMe,
    });
  },
};
module.exports = FriendsController;
