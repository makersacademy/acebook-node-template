const Friend = require("../models/friend");
const User = require("../models/user");
const Image = require("../models/image");

const FriendsController = {
  Add: async (req, res) => {
    const existingFriends = await Friend.find({
      $or: [
        { requester: req.session.user._id, recipient: req.body.content },
        { requester: req.body.content, recipient: req.session.user._id },
      ],
    });

    const friendNonExistent = existingFriends.length == 0;

    if (friendNonExistent) {
      const friendship = new Friend({
        requester: req.session.user._id,
        recipient: req.body.content,
        status: 0,
      });
      await friendship.save();
    }
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
    await Friend.findOneAndDelete({
      $or: [
        {
          recipient: req.session.user._id,
          requester: req.params.id,
          status: 1,
        },
        {
          recipient: req.params.id,
          requester: req.session.user._id,
          status: 1,
        },
      ],
    });

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
  Search: async (req, res) => {
    let searchUsers;
    const user = req.session.user;
    if (req.query.search.length != 0) {
      searchUsers = await User.find({
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      });
    }

    const usersAndPicsAndFriends = await Promise.all(
      searchUsers.map(async (userObject) => {
        const image = await Image.findOne({ user: userObject._id });
        const friendsFound = await Friend.find({
          $or: [
            { recipient: userObject.id, requester: user._id },
            { recipient: user._id, requester: userObject.id },
          ],
        });
        const isNotFriends = friendsFound.length == 0;
        return { user: userObject, picture: image, notFriends: isNotFriends };
      })
    );
    res.render("friends/search", {
      users: searchUsers,
      session: req.session,
      usersAndPicsAndFriends: usersAndPicsAndFriends,
    });
  },
};
module.exports = FriendsController;
