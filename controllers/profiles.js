const User = require("../models/user");

const ProfilePage = {
  Index: (req, res) => {
    console.log("this page has been refreshed");
    const profileUsername = req.params.username;
    User.find({ username: profileUsername }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user[0])
        res.render("profiles/index", {
          profileUsername: profileUsername,
          friends: user[0].friends,
          fetchUrl: "/friends/requests/new/" + user[0].username,
        });
      }
    });
  },
};

module.exports = ProfilePage;
