// const contentType = require("express/lib/response");
const User = require("../models/user");
// const ObjectID = require("mongodb");
const path = require("path");
const util = require("../util/photoHandler")


const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    User.findOne({email: req.body.email }, function(err, user){
      if (req.files){
        console.log("has been called");
        let profileImg = req.files.profile_img;
        let newName = util.generateName() + "." + util.getExtension(profileImg.name)
        profileImg.mv("./images/" + newName);
        req.body.profile_img = newName;
      }

      if ( user ) {
        console.log("User already exists!");
        res.redirect("/");
        return;
      }  

      user = new User(req.body)
      user.save((err) => {
        if (err) {
          throw err;
        }

        res.status(201).redirect("/posts");
      })
    },
  )},
  ProfilePic: (req, res) => {
    const email = req.session.user.email;
    User.findOne({email: email}, function (err, user){
      if (err || !user){
        res.status(200).sendFile(path.join(__dirname, "../images", "default.png") )
      } else {
        res.status(200).sendFile(path.join(__dirname, "../images", user.profile_img))
      }
    })
  }
};

module.exports = UsersController;
