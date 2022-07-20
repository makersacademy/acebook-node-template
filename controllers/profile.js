const Post = require("../models/post");
const User = require("../models/user");

const ProfileController = {
  Index: (req, res) => {
    // creating date of birth in correct format from session data
    const birthdayData = new Date(req.session.user.birthday)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateOfBirth = birthdayData.toLocaleDateString('en-GB', options)
    
    // userId from session data stored as variable to pass to Post.find method
    const ObjectId = require("mongodb").ObjectId;
    const userId = ObjectId(req.session.user._id);
    
    // searching database by userId
    Post.find({ userId: userId }, (err, userPosts) => {
      if (err) {
        throw err;
      }
      res.render("profile/userProfile", { 
        posts: userPosts.reverse(),
        title: "Profile Page",
        user: req.session.user,
        birthday: dateOfBirth
      });
    }
    )
  },

  OtherUser: (req, res) => {
   
    // find the user's data in the database, return one object that matches
    User.findOne({ username: req.params.username }, (err, userData) => {
      if (err) {
        throw err;
      }
      // creating date of birth in correct format from userData
      const birthdayData = new Date(userData.birthday)
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const dateOfBirth = birthdayData.toLocaleDateString('en-GB', options)

      //search for posts made by this user
      Post.find({ userId: userData._id }, (err, userPosts) => {
        if (err) {
          throw err;
        }
      
      // pass user data object into view file
      res.render("profile/otherUserProfile", {
        user: userData,
        posts: userPosts,
        birthday: dateOfBirth
      })
      })
    })
  }
}

module.exports = ProfileController