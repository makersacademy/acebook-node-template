const User = require("../models/user");
const Post = require("../models/post");
const fs = require('fs');
const path = require('path');

const UsersController = {

  Index: (req, res) => {
    console.log("Checking", req.session.userName);
    if(!req.session.userName) {
      res.redirect("/");
      return;
    }
    Post.find({userID: req.session.userID})
    .sort({'date': -1})
    .limit(10)
    .exec(async(err, posts) => {
      if (err) {
        throw err;
      }
      const user = await User.findOne({ userName: req.session.userName }).exec();
      const photo = {
        contentType: user.photo.contentType,
        data: user.photo.data.toString('base64'), // <- user photo added to profile page
      };
      res.render("users/profile", { userName: req.session.userName, posts: posts, photo});
    });
  },

  New: (req, res) => {
    res.render("users/new", { newUser: true });
  },

  Create: (req, res) => {
    const photo = {
      data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
      contentType: req.file.mimetype,
    };

    const user = new User({ ...req.body, photo });
    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user; // login in user straight away after sign up and redirect to posts page
      req.session.userID = user._id;
      req.session.userName = user.userName;
      res.status(201).redirect("/posts");
    });
    console.log(req.file)
  },
};

module.exports = UsersController;
