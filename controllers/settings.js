const multer = require("multer");
const upload = multer().single("uploadedImage");
const User = require("../models/user");

const SettingsController = {
  Index: (req, res) => {
    User.findById(req.session.user._id)
      .then((user) => {
        res.render("settings/index", { user: user });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  UploadImage: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        User.findById(req.session.user._id).then((user) => {
          console.log(req.file);
          user.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          };
          user
            .save()
            .then(() => res.redirect("/settings"))
            .catch((err) => console.log(err));
        });
      }
    });
  },
};

module.exports = SettingsController;
