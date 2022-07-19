const Post = require("../models/post");

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
        userData: req.session.user,
        birthday: dateOfBirth
      });
    }
    )
  }
}

module.exports = ProfileController