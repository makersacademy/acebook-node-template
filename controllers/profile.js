const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {

    User.findOne({_id: req.session.user._id}).exec((err, user) => {
      if (err) {
        throw err;
      }
      res.render("profile/index", { user: user });
    });    
  },
};

module.exports = ProfileController;