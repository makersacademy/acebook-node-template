const User = require("../models/user");
const util = require("../util/photoHandling");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    if (req.files) {
      console.log('has been called');
      let photo = req.files.profilePicture;
      let newName = util.generateName() + "." + util.getExtension(photo.name);
      photo.mv("./public/upload/" + newName);
      req.body.profilePicture = newName;
    }

    const user = new User(req.body);
    let error = user.validateSync();
    if (error) {
      res.redirect("/users/new");
      return
    }

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
