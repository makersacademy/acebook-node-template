const Friend = require("../models/friend");

const FriendsController = {
  Create: (req, res) => {
    const friendUsername = req.params.friendUsername;
    const currentUsername = req.params.currentUsername;

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

// Model.updateOne({ name: FINDBYNAME }, { ship: UPDATETO });

module.exports = FriendsController;
