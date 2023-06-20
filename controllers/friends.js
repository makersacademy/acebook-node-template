const friendService = require("../services/friendService");

const FriendsController = {
  Index: async (req, res) => {
    try {
      const friendshipsRequests = await friendService.getFriendshipRequests(
        req.session.user._id
      );
      const pendingFriendships = await friendService.getPendingFriendships(
        req.session.user._id
      );
      const acceptedFriendships = await friendService.getAcceptedFriendships(
        req.session.user._id
      );

      res.render("friends/index", {
        friendshipsRequests,
        pendingFriendships,
        acceptedFriendships,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  Create: async (req, res) => {
    try {
      const existingFriendship = await friendService.getExistingFriendship(
        req.session.user._id,
        req.body.recipientId
      );

      if (!existingFriendship) {
        await friendService.createFriendship(
          req.session.user._id,
          req.body.recipientId
        );
      }

      res.redirect("/friends");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },

  Accept: async (req, res) => {
    try {
      const existingFriendship = await friendService.acceptFriendship(
        req.body.requesterId,
        req.session.user._id
      );

      if (!existingFriendship) {
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
      const existingFriendship = await friendService.rejectFriendship(
        req.body.requesterId,
        req.session.user._id
      );

      if (!existingFriendship) {
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
