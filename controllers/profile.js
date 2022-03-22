const User = require("../models/user");

const ProfileController = {
    Index: (req, res) => {
        
        res.render("profile/index", {});
    },

    Edit: (req, res) => {
        res.render("editProfile/index");
      },

    Update: (req, res) => {
        User.findOne({_id: req.session.user._id}).exec().then((user) => {
            user.firstName = req.body.firstName
            user.surName = req.body.surName
            user.bio = req.body.bio
            user.location = req.body.location
            user.save()
        }).then(() => {
            res.status(201).redirect("/profile")

        })
      },
};

module.exports = ProfileController;