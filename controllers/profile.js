const User = require("../models/user");
const Post = require("../models/post");

const ProfileController = {
    Index: (req, res) => {
        User.findOne({_id: req.session.user._id}).exec().then(async (user) => {
          const posts = await Post.find({user: user._id}, 'message createdAt', {sort: {'createdAt': -1}}).exec() 
            res.render("profile/index", {user: user, posts: posts});
        });    
    },

    Edit: (req, res) => {
        User.findOne({_id: req.session.user._id}).exec().then((user) => {
            res.render("editProfile/index", {user: user});
        });
      },

    Update: (req, res) => {
        User.findOne({_id: req.session.user._id}).exec().then((user) => {
            user.firstName = req.body.firstName
            user.surName = req.body.surName
            user.title = req.body.title
            user.pronouns = req.body.pronouns
            user.bio = req.body.bio
            user.location = req.body.location
            user.save()
        }).then(() => {
            res.status(201).redirect("/profile")

        })
      },

    Feed: (req, res) => {
      Post.find({post: req.query.user}, 'comment createdAt', {sort: {'createdAt': -1}}, (err, post) => {
        if (err) {
          throw err;
        }
        res.render("/profile", { post: post, user_id: req.query.user });
      }).populate('user');
    }
};

module.exports = ProfileController;