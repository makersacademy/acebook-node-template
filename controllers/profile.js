const User = require("../models/user");


const ProfileController = {
  Index: (req, res) => {
    User.find((err, users) => {
      if (err) {
        throw err;
      }



      res.render("profile/index", { users: users});
    });
  },
};

module.exports = ProfileController;
