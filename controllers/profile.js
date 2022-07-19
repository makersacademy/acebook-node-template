const Post = require("../models/post");

const ProfileController = {
  Index: (req, res) => {
    console.log(req.session.user)
  
    // userId from session data stored as variable to pass to Post.find method
    const ObjectId = require("mongodb").ObjectId;
    const userId = ObjectId(req.session.user._id);
    // searching database by userId
    Post.find({ userId: userId }, (err, userPosts) => {
      if (err) {
        throw err;
      }
      res.render("profile/userProfile", { posts: userPosts.reverse(), title: "Profile Page", userData: req.session.user});
    }
    )
  }
}

module.exports = ProfileController