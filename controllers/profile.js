const Post = require("../models/post");

const ProfileController = {
 Profile: async (req, res) => {
  try{
    const posts = await Post.find({user: req.session.user._id})
    .populate('user') 
    .sort({ createdAt: -1})
    posts.forEach((post) => {
          post.postedAt = post.createdAt.toLocaleString();
          // console.log(post.postedAt);
    })
    // console.log(posts);
    res.render("profile", {
      posts: posts,
      title: "Acebook",
      name: req.session.user.name,
      username: req.session.user.username,
    });
  

  } catch {
    console.log("error")
  }
 }
};

module.exports = ProfileController;
