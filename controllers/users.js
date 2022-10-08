const Post = require("../models/post");
const User = require("../models/user");
const Friend = require("../models/friend");
const session = require("express-session");

const UsersController = {
  New: (req, res) => {
    // console.log(req.body.errorMessage)
    const errors = req.session.errors;
    req.session.errors = [];
    res.render("users/new", {signedIn: req.session.signedIn, errors: errors});
  },

  Create: async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).redirect("/posts")
    } catch (err) {
      req.session.errors = []
      for (const [errorType, errorMessage] of Object.entries(err.errors)) {
        req.session.errors.push(errorType.toUpperCase() + " ERROR: " + errorMessage + ".")
      }
      res.redirect("users/new");


      }
    },

  ViewProfile: async (req, res) => {
    var userId = req.params.userId;
    var user = await User.findById(userId).populate({path : 'friends', populate: {path: 'recipient'}}).populate(
    {path: 'friends', populate: {path: 'requester'}})
    var posts = await Post.find({user: {_id: userId}})
    let notFriends = true;
    let pendingFriend = false;
    let requestedFriend = false;
    let areFriends = false;
    await user.friends.forEach(friend => {

      const haveInteracted = (String(req.session.user._id) == String(friend.recipient._id)) ||
      (String(req.session.user._id) == String(friend.requester._id));

      if (friend.status === 1) {
        if (haveInteracted) {
           requestedFriend = true
           notFriends = false;
        };
      }else if (friend.status === 2){
        if (haveInteracted) {
          pendingFriend = true;;
          notFriends = false;

        }
      }else if (friend.status === 3){

        if (haveInteracted) {
          areFriends = true;
          notFriends = false;

        }
      }


      }

    )

    const acceptedFriends = user.friends.filter(f => f.status === 3 && String(f.recipient )=== String(user._id));
    const friendsWhoAccepted = user.friends.filter(f => f.status === 3 && String(f.requester._id) === String(user._id));
    res.render("users/profile", {signedIn: req.session.signedIn, posts: posts, user: user, acceptedFriends: acceptedFriends, friendsWhoAccepted: friendsWhoAccepted, areFriends: areFriends, notFriends: notFriends, requestedFriend: requestedFriend, pendingFriend: pendingFriend},
      );

  },

  AddFriend: async (req, res) => {
    const user1 = req.session.user._id;
    const user2 = req.params.userId;

    const docA = await Friend.findOneAndUpdate(
      { requester: user1, recipient: user2 },
      { $set: { status: 1 }},
      { upsert: true, new: true }
    )

    const docB = await Friend.findOneAndUpdate(
      { recipient: user1, requester: user2 },
      { $set: { status: 2 }},
      { upsert: true, new: true }
    )

    const updateUser1 = await User.findOneAndUpdate(
      { _id: user1 },
      { $addToSet: { friends: docA._id }}
  )
    const updateUser2 = await User.findOneAndUpdate(
      { _id: user2 },
      { $addToSet: { friends: docB._id }}
    )
    res.redirect('back');
  },

  AcceptFriend: async (req, res) => {


    const user1 = req.session.user._id;

    const user2 = req.params.userId;
    const docA = await Friend.findOneAndUpdate(
      { requester: user1, recipient: user2},
      { $set: { status: 3 }},
      { upsert: true, new: true }
    )

    const docB = await Friend.findOneAndUpdate(
      { recipient: user1, requester: user2 },
      { $set: { status: 3 }},
      { upsert: true, new: true }
    )
    const friends = await Friend.find();
    console.log(friends)
    res.redirect('back');


  },

  RejectFriend: async (req, res) => {
    console.log('---------------------------here-----------')

    const user1 = req.session.user._id;
    console.log("#################################")
    console.log(user1)
    console.log("#################################")
    const user2 = req.params.userId;
    const docA = await Friend.findOneAndUpdate(
      { requester: user1, recipient: user2},
      { $set: { status: 0 }},
      { upsert: true, new: true }
    )

    const docB = await Friend.findOneAndUpdate(
      { recipient: user1, requester: user2 },
      { $set: { status: 0 }},
      { upsert: true, new: true }
    )
    res.redirect('back');

  }




  };

module.exports = UsersController;
