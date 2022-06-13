const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
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
    res.status(201).redirect("/users/new");
  }
};

module.exports = UsersController;
