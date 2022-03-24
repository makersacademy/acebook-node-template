const User = require("../models/user");
const Post = require("../models/post");

const ProfileController = {
    Index: (req, res) => {
        User.findOne({_id: req.session.user._id}).exec().then((user) => {
            res.render("profile/index", {user: user});
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
      Post.find({}, 'message createdAt likesList', {sort: {'createdAt': -1}},(err, posts) => {
        if (err) {
          throw err;
        }
        res.render("/profile", { posts: posts });
        }).populate('user');
    }
};

module.exports = ProfileController;