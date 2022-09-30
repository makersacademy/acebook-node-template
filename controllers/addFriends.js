const User = require("../models/user");

const addFriendsController = {
  Search: async (req, res) => {
    const searchTerm = req.query.searchTerm;

    let results = [];
    if (searchTerm) {
      results = await User.find(
        {
          firstName: new RegExp(searchTerm, "i"),
        },
        "firstName email image"
      ).exec();

      results = await results
        .map((user) => ({
          ...user._doc,
          image: user.image.data.toString("base64"),
        }))
        .filter((user) => user._id != req.session.user._id);
    }


    res.render("addFriends/index", { results: results });
  },
  Send: async (req, res) => {
    // in terms of who sent the friend request:
    const receiver = req.body.userId;
    const sender = req.session.user._id;

    // Update receiver's received
    await User.findByIdAndUpdate(receiver, {
      $push: { received: sender },
    });

    // Update sender's sent
    await User.findByIdAndUpdate(sender, {
      $push: { sent: receiver },
    });

    res.status(201).redirect("/myprofile");
  },
  Cancel: async (req, res) => {
    // in terms of who sent the friend request:
    const receiver = req.body.userId;
    const sender = req.session.user._id;

    // remove request from sender
    await User.findByIdAndUpdate(sender, {
      $pull: { sent: receiver },
    });

    // remove request from receiver
    await User.findByIdAndUpdate(receiver, {
      $pull: { received: sender },
    });

    res.status(201).redirect("/myprofile");
  },
  Accept: async (req, res) => {
    // in terms of who sent the friend request:
    const receiver = req.session.user._id;
    const sender = req.body.userId;

    // remove request from sender
    await User.findByIdAndUpdate(sender, {
      $pull: { sent: receiver },
    });

    // remove request from receiver
    await User.findByIdAndUpdate(receiver, {
      $pull: { received: sender },
    });

    // add to sender & receiver to each other's friends array
    await User.findByIdAndUpdate(sender, {
      $push: { friends: receiver },
    });
    await User.findByIdAndUpdate(receiver, {
      $push: { friends: sender },
    });

    res.status(201).redirect("/myprofile");
  },
  Decline: async (req, res) => {
    // in terms of who sent the friend request:
    const receiver = req.session.user._id;
    const sender = req.body.userId;

    // remove request from sender
    await User.findByIdAndUpdate(sender, {
      $pull: { sent: receiver },
    });

    // remove request from receiver
    await User.findByIdAndUpdate(receiver, {
      $pull: { received: sender },
    });

    res.status(201).redirect("/myprofile");
  },
};

module.exports = addFriendsController;
