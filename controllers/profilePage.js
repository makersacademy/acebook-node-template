const User = require("../models/user");

const ProfilePageController = {
  Index: (req, res) => {
    res.render("profile/index", {});
  },

   AddFriend: (req, res) => {
    const user = req.session.user;
    const userEmail_to_find = req.body.user_email;
    User.findOne({ email: userEmail_to_find }).then((response_user)=> {
      user.friends.pop(response_user.userName)
      user.save()
    })
    res.redirect()

  },
};

module.exports = ProfilePageController;