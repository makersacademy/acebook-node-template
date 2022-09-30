const User = require("../models/user");

const HomeController = {
  // Index: (req, res) => {
  //   res.render("home/index", { title: "Acebook" });
  // },
  MyProfile: async (req, res) => {
    // check if logged in
    if (!req.session.user) {
      // if they are not logged in
      res.redirect("/sessions/new");
    } else {
      // if they are logged in

      // 1) look for their updated user model
      var profileImage = [];
     await User.findOne({ _id: req.session.user._id }).then((user) => {
        profileImage= user.image.data.toString("base64");
        console.log(profileImage);
        req.session.user = user;
      });

      // 2) find users they are friends with
      const friends = [];
      req.session.user.friends.forEach((userId) => {
        User.findOne({ _id: userId }).then((user) => {
          friends.push(user);
        });
      });

      // 3) find users they've sent a request to
      const sent = [];
      req.session.user.sent.forEach((userId) => {
        User.findOne({ _id: userId }).then((user) => {
          sent.push(user);
        });
      });

      // 4) find users they've received a request from
      const received = [];
      req.session.user.received.forEach((userId) => {
        User.findOne({ _id: userId }).then((user) => {
          received.push(user);
        });
      });

      res.render("home/myprofile", {
        user: req.session.user,
        friends: friends,
        sent: sent,
        received: received,
        profileImage: profileImage
      });
    }
  },
};

module.exports = HomeController;
