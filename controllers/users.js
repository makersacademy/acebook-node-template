const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("/", {});
  },

  Create: (req, res) => {
    var userInput = req.body;
    userInput["profilePhotoPath"] = 'images/default_profile_photo.png';
    const user = new User(userInput);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  NewPhoto: (req, res) => {
    res.render("users/photo/new", {});
  },

  CreatePhoto: (req, res) => {
    console.log(JSON.stringify(req.file));
    var fileName = req.file.filename;
    User.find({_id: req.session.user._id }, (err, users) => {
      if (err) {
        throw err;
      }
      var user = users[0];
      user["profilePhotoPath"] = `/uploads/${fileName}`;
      user.save((err) => {
        if (err) {
          throw err;
        }
        req.session.user = user;
        res.status(201).redirect("/posts")
      })
    })
  }
};

module.exports = UsersController;
