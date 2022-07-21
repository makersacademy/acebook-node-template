const Post = require("../models/post");
const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    // find user data from database, using userId from session
    const ObjectId = require("mongodb").ObjectId;
    const userId = ObjectId(req.session.user._id);

    User.findOne({ _id: userId }, (err, userData) => {
      if (err) {
        throw err;
      }
      // find user's posts in database
      Post.find({ userId: userId }, (err, userPosts) => {
        if (err) {
          throw err;
        }
        // change birthday into correct format
        const birthdayData = new Date(userData.birthday);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const dateOfBirth = birthdayData.toLocaleDateString("en-GB", options);

        res.render("profile/userProfile", {
          posts: userPosts.reverse(),
          user: userData,
          birthday: dateOfBirth,
        });
      });
    });
  },

  OtherUser: (req, res) => {
    // find the user's data in the database, return one object that matches
    User.findOne({ username: req.params.username }, (err, userData) => {
      if (err) {
        throw err;
      }
      // creating date of birth in correct format from userData
      const birthdayData = new Date(userData.birthday);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateOfBirth = birthdayData.toLocaleDateString("en-GB", options);

      //search for posts made by this user
      Post.find({ userId: userData._id }, (err, userPosts) => {
        if (err) {
          throw err;
        }

        // pass user data object into view file
        res.render("profile/otherUserProfile", {
          user: userData,
          posts: userPosts,
          birthday: dateOfBirth,
        });
      });
    });
  },

  EditInfoView: (req, res) => {
    // pass user data into edit info page
    User.findOne({ username: req.params.username }, (err, userData) => {
      if (err) {
        throw err;
      }
      res.render("profile/editInfo", {
        user: userData,
      });
    });
  },

  EditInfo: (req, res) => {
    // update user info with inputted data from edit info page
    User.updateOne(
      { username: req.params.username },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          location: req.body.location,
          profilePic: req.body.profilePic
        },
      },
      (err) => {
        if (err) {
          throw err;
        }
        res.redirect(`/profile/user/${req.params.username}`);
      }
    );
  },

  Search: (req, res) => {
    console.log(`link working: ${req.params}`)
    console.log(req.body)
    console.log(req)
    res.render('search/index');
  },
};

module.exports = ProfileController;
