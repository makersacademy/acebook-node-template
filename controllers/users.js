const User = require("../models/user");
const {ObjectID} = require("mongodb");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
      if (req.body.email !== req.body.confirm_email || req.body.password !== req.body.confirm_password) { 
        return res.redirect("users/new");    
      }
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Profile: (req, res) => {
   const user = req.session.user
    res.render("users/profile", {user});
  },

  /**
   * Finds a user's profile photo.
   */
  async ProfilePhoto(req, res) {
    // if the id is not valid, return 404 Not Found
    if (!ObjectID.isValid(req.params.id)) return res.status(404).send()

    // find the user
    const user = await User.findById(req.params.id)
    // if they don't exist, return 404 Not Found
    if (!user) res.status(404).send()

    if (user.img.contentType) {
      // if the user has an image, return it
      res.set("content-type", user.img.contentType)
      res.send(user.img.data)
    } else {
      // if the user doesn't have an image, send 204 No Content
      res.status(204).send()
    }
  },

  async AllUsers(req, res) {
    const users = await User.find();
    res.render("users/all", {users})
  }
};

module.exports = UsersController;
