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
    res.render("profile/index", {
      posts: posts,
      friends: friends,
      title: "Acebook",
      name: req.session.user.name,
      username: req.session.user.username,
      bio: req.session.user.bio,
      image: req.session.user.image,
    });

  } catch (err) {
    console.log(err)
  }
 },

 UserList: async (req, res) => {
  try{
    const current = await User.findOne({"_id": req.session.user._id}).populate('sent_requests')
    const users = await User.where({"_id": {$ne: req.session.user._id}})
                          .and({"_id": {$nin: current.sent_requests}})
                          .and({"_id": {$nin: current.friends}})
                          .and({"_id": {$nin: current.pending_friends}})

    res.render("profile/userlist", { 
      users: users,
      awaiting_approval: current.sent_requests,
      title: "Acebook Users",
      id: req.session.user._id,
      name: req.session.user.name,
      username: req.session.user.username,
      bio: req.session.user.bio,
      image: req.session.user.image,
    });
  } catch {
    console.log("error")
  }
},

FriendList: async (req, res) => {
  try{
  const current = await User.findOne({"_id": req.session.user._id})
  const friends = await User.where({"_id": {$in: current.friends}}).populate('user')
  const awaiting_response = await User.where({"_id": {$in: current.sent_requests}}).populate('user')
  const pending_friends = await User.where({"_id": {$in: current.pending_friends}}).populate('user')

    res.render("profile/friendlist", { 
        friends: friends,
        pending_friends: pending_friends,
        awaiting_response: awaiting_response,
        title: "Acebook Users",
        id: req.session.user._id,
        name: req.session.user.name,
        username: req.session.user.username,
        bio: req.session.user.bio,
        image: req.session.user.image,
    });
  } catch (err) {
    console.log(err.messages);
  }
},

 ViewPerson: async (req,res) => {
   
 }

};

module.exports = ProfileController;
