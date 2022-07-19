const Post = require("../models/post");

const ProfileController = {
  Index: (req, res) => {
    // username pulled from the session data
    const username = req.session.user.name;
    // userId from session data stored as variable to pass to Post.find method
    const ObjectId = require("mongodb").ObjectId;
    const userId = ObjectId(req.session.user._id);
    // searching database by userId
    Post.find({ userId: userId }, (err, userPosts) => {
      if (err) {
        throw err;
      }
      res.render("profile/userProfile", { posts: userPosts.reverse(), name: username, title: "Profile Page"});
    }
    )
  }
}

module.exports = ProfileController