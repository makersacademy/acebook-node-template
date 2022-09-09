// const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    res.render("profile/index", {
      title: "Acebook",
      name: req.session.user["firstName"],
      url: req.session.user["profilePic"],
    });
  },
};

module.exports = ProfileController;
