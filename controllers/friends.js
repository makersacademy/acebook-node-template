const Friend = require("../models/friend");

const FriendsController = {
  Index: async (req, res) => {
    try {
      const friendshipsRequests = await Friend.find({
        requester: req.session.user._id,
        friendship: null,
      })
        .populate({ path: "recipient", select: "username" })
        .exec();

      const pendingFriendships = await Friend.find({
        recipient: req.session.user._id,
        friendship: null,
      })
        .populate({ path: "requester", select: "username" })
        .exec();

      const acceptedFriendships = await Friend.find({
        recipient: req.session.user._id,
        friendship: true,
      })
        .populate({ path: "requester", select: "username" })
        .exec();

      res.render("friends/index", {
        friendshipsRequests: friendshipsRequests,
        pendingFriendships: pendingFriendships,
        acceptedFriendships: acceptedFriendships,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  Create: async (req, res) => {
    try {
      const existingFriendship = await Friend.findOne({
        $or: [
          { requester: req.session.user._id, recipient: req.body.recipientId },
          { requester: req.body.recipientId, recipient: req.session.user._id },
        ],
      });

      if (!existingFriendship) {
        const friendship = new Friend({
          requester: req.session.user._id,
          recipient: req.body.recipientId,
        });

        await friendship.save();
      }

      res.redirect("/friends");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  Accept: async (req, res) => {
    try {
      const existingFriendship = await Friend.findOne({
        requester: req.body.requesterId,
        recipient: req.session.user._id,
      });

      if (existingFriendship) {
        existingFriendship.friendship = true;
        await existingFriendship.save();
      } else {
        return res.status(400).json({
          error: "No existing friendship to accept",
        });
      }

      res.redirect("/friends");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  Reject: async (req, res) => {
    try {
      const existingFriendship = await Friend.findOne({
        requester: req.body.requesterId,
        recipient: req.session.user._id,
      });

      if (existingFriendship) {
        existingFriendship.friendship = false;
        await existingFriendship.save();
      } else {
        return res
          .status(400)
          .json({ error: "No existing friendship to reject." });
      }

      res.redirect("/friends");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
};

module.exports = FriendsController;
