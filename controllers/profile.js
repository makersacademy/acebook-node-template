const User = require("../models/user");


const ProfileController = {
  Index: (req, res) => {
    const currentUser = req.session.user; // Get the currently signed-in user from the session
    User.find({}, (err, allUsers) => {
      if (err) {
        throw err;
      }

      const friends = currentUser.friends;
      const friends_names =  allUsers.filter(
        (user) => friends.includes(user.email)
      );
      console.log(friends)
      console.log(currentUser)
      const nonFriends = allUsers.filter(
        (user) => !friends.includes(user.email) && (user.email !=currentUser.email)
      );

      res.render("profile/index", { friends_names: friends_names, nonFriends: nonFriends });
    });
  },
};

module.exports = ProfileController;
