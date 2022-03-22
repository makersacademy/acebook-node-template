const Post = require("../models/post");
const User = require("../models/user");

const ProfileController = {
 Profile: async (req, res) => {
  try{
    const posts = await Post.find({user: req.session.user._id})
    .populate('user') 
    .sort({ createdAt: -1})
    posts.forEach((post) => {
      post.postedAt = post.createdAt.toLocaleString();
      console.log(post.postedAt);
    })
    const user = await User.findOne({"_id": req.session.user._id});
    const someFriends  = user.friends.slice(0, 2); //2 friends for now
    const friends = await User.where({"_id": {$in: someFriends}})
    res.render("profile", {
      posts: posts,
      friends: friends,
      title: "Acebook",
      name: req.session.user.name,
      username: req.session.user.username,
    });
  

  } catch {
    console.log("error")
  }
 },

};

module.exports = ProfileController;
