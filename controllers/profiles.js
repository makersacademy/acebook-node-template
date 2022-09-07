// const User = require("../models/user");

const ProfilePage = {
  Index: (req, res) => {
    let currentUsername = null;
    if (req.session.user) currentUsername = req.session.user.username;
    res.render("profiles/index", {
      profileUsername: req.params.username,
      currentUsername: currentUsername,
    });
  },

  // code to be added to friends controller
  //  AddFriend: (req, res) => {
  //   const user = req.session.user;
  //   const userEmail_to_find = req.body.user_email;
  //   User.findOne({ email: userEmail_to_find }).then((response_user)=> {
  //     user.friends.pop(response_user.userName)
  //     user.save()
  //   })
  //   res.redirect()
};

module.exports = ProfilePage;
