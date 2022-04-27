const User = require("../models/user");
const {ObjectID} = require("mongodb");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  async Create(req, res) {
    const user = new User(req.body);
    const email = req.body.email;
    if (req.body.email !== req.body.confirm_email || req.body.password !== req.body.confirm_password) {
      return res.redirect("users/new");
    }
    if (await User.exists({email: email})) {
      return res.redirect("/users/new#repeatedemail");
    }

    await user.save()
    res.status(201).redirect("/posts");
  },

  Profile(req, res) {
    const user = req.session.user
    res.render("users/profile", {user});
  },

  EditPage(req, res) {
    res.render("users/edit_profile");
  },

  async EditProfile(req, res) {
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    }
    if (req.file) data.img = {
      contentType: req.file?.type,
      data: req.file?.buffer
    }
    req.session.user = await User.findByIdAndUpdate(req.session.user._id,
        data,
        {new: true}
    )
    res.redirect('/users/profile')
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

    if (user.img.data) {
      // if the user has an image, return it
      res.set("content-type", user.img.contentType)
      res.send(user.img.data)
    } else {
      // if the user doesn't have an image, send 204 No Content
      res.status(204).send()
    }
  },

  async ProfilePhotoUpload(req, res) {
    await User.findByIdAndUpdate(req.session.user._id, {
      img: {
        contentType: req.file?.type,
        data: req.file?.buffer
      },
    });
    res.status(201).redirect('/users/profile');
  },


  async AllUsers(req, res) {
    const users = await User.find();
    res.render("users/all", {users})
  }
};

module.exports = UsersController;
