const User = require("../models/user");
const { ImgurClient } = require('imgur');


const client = new ImgurClient({ clientId: 'c210e55e116acae' });

const ProfilePage = {
  Index: (req, res) => {
    let profileUsername = req.params.username;
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
            console.log(user.img)
            console.log(`${profileUsername}'s profile has been loaded`);
            const friendsListWithUsernames = user.friends.map((friend) => friend.username);
            res.render("profiles/index", {
              profileUsername: profileUsername,
              friends: friendsListWithUsernames,
              fetchUrl: "/friends/requests/new/" + profileUsername,
              url: user.img
            });
          }
        }
      });
  },
  Find: (req, res) => {
    const profileUsername = req.body.searchBar;
    res.redirect(`/profiles/${profileUsername}`);
  },

 Image: async(req, res) => {
    try {
      console.log("here")
      const image_data = req.files.image.data;
      const username = req.session.user.username
      const response = await client.upload({
        image: image_data,
        type: 'buffer',
      });
      const url = response.data.link
      await User.findOneAndUpdate({username: username}, {img: url} )

      res.redirect(`/profiles/${username}`);
  } catch (err) {
      res.status(500)
  }
 },
};

module.exports = ProfilePage;