const User = require("../models/user");

const ProfilePage = {
  LoadFromProfileButton: (req, res) => {
    res.redirect(`/profiles/${req.session.user.username}`);
  },

  Index: (req, res) => {
    let profileUsername = req.params.username;

    if (!profileUsername) {
      profileUsername = req.body.searchBar;
    }
    // find user model belonging to profile
    User.findOne({ username: profileUsername })
      .populate("friends")
      .exec((err, user) => {
        if (err) {
          // do something if there's an error
          console.log("ProfilePage.index error with User.findOne");
          console.log(err);
        } else {
          if (!user) {
            console.log(`Unable to find ${profileUsername}'s profile`);
            res.render("profiles/userNotFound");
          } else {
            console.log(`${profileUsername}'s profile has been loaded`);
            let profileFirstname = user.first_name;
            let profileLastname = user.last_name;

            const friendsListWithUsernames = user.friends.map(
              (friend) => friend.username
            );
            res.render("profiles/index", {
              profileUsername: profileUsername,
              profileFirstname: profileFirstname,
              profileLastname: profileLastname,
              friends: friendsListWithUsernames,
              fetchUrl: "/friends/requests/new/" + profileUsername,
            });
          }
        }
      });
  },
};

module.exports = ProfilePage;
