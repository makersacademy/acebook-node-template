const Post = require("../models/post");

const ProfileController = {
  Index: (req, res) => {
    const username = req.session.user.name;
    const ObjectId = require("mongodb").ObjectId;
    const userId = ObjectId(req.session.user._id);
    Post.find(({ userId: userId}, (err, userPosts) => {
      if (err) {
        throw err;
      }
      console.log(userPosts)
      res.render("profile/userProfile", { posts: userPosts, name: username, title: "Profile Page"});
    }))
  }
}

module.exports = ProfileController