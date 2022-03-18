// const User = require("../models/user");
// const bcrypt = require("bcrypt");

const ProfileController = {
    Profile: (req, res) => {
    console.log(req.session.user._id);
    res.render("profile", { 
          title: "Acebook",
          name: req.session.user.name,
          username: req.session.user.username,
    });
  },
};

module.exports = ProfileController;
