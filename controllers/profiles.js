const User = require("../models/user");

const ProfilePage = {
  Index: (req, res) => {
    // let currentUsername = null;
    const profileUsername = req.params.username;
    // if (req.session.user) currentUsername = req.session.user.username;
    User.find({ username: profileUsername }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render("profiles/index", {
          profileUsername: profileUsername,
          friends: user.friends,
        });
      }
    });
  },
};

module.exports = ProfilePage;
