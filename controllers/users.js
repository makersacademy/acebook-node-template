const User = require("../models/user");
const Friend = require("../models/friend");
const { validationResult } = require('express-validator');

const UsersController = {
  Profile: async (req, res) => {
    const profile_user = await User.findOne({ username: req.params.username });
    const user = req.session.user;
    const requestsObject = await Friend.find({
      recipient: profile_user.id,
      status: 0,
    });
    const friendsObject = await Friend.find({
      $or: [
        { recipient: profile_user.id, status: 1 },
        { requester: profile_user.id, status: 1 },
      ],
    });
    //Gets all friend Requests
    const requests = await Promise.all(
      requestsObject.map(
        async (requestsObject) => await User.findById(requestsObject.requester)
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
    // we are friends - tbc need to test with the button
    const friendsBool = await Friend.find({
      status: "1",
      $or: [
        { requester: profile_user.id, recipient: user._id },
        { requester: user._id, recipient: profile_user.id },
      ],
    });
    // there is a request but we are not friends. Either of use could have sent the request
    const friendRequestedBool = await Friend.find({
      status: "0",
      $or: [
        { requester: profile_user.id, recipient: user._id },
        { requester: user._id, recipient: profile_user.id },
      ],
    });
    // there is a request. I have sent the request
    const myRequestBool = await Friend.find({
      status: "0",
      requester: user._id,
      recipient: profile_user.id,
    });
    // there is a request. They have sent the request
    const theirRequestBool = await Friend.find({
      status: "0",
      requester: profile_user.id,
      recipient: user._id,
    });
    res.render("users/profile", {
      user: profile_user,
      session: req.session,
      pageOwnerBool: profile_user.username === user.username,
      friends: friends,
      requests: requests,
      friendsBool: friendsBool,
      friendRequestedBool: friendRequestedBool,
      myRequestBool: myRequestBool,
      theirRequestBool: theirRequestBool,
    });
  },

  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("users/new", { errors: errors.array() });
      return;
    } 
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(500).redirect("users/new");
      }
      res.status(201).redirect("/posts");
    });
  },

  Search: (req, res) => {
    User.find(
      {
        $or: [
          { firstName: { $regex: req.query.search, $options: "i" } },
          { lastName: { $regex: req.query.search, $options: "i" } },
          // { email: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      },
      function (err, users) {
        if (err) {
          throw err;
        }
        res.render("users/search", { users: users, session: req.session});
      }
    );
  },
};

module.exports = UsersController;
