const Image = require("../models/image");
const multer = require("multer");
const upload = multer().single("uploadedImage");
const User = require("../models/user");

const SettingsController = {
  Index: (req, res) => {
    User.findById(req.session.user._id)
      .then((user) => {
        //overwrite the image field of the user object with the src string and pass user object to render
        const viewUser = {
          name: user.name,
          email: user.email,
          image: `data:${
            user.image.contentType
          };base64,${user.image.data.toString("base64")}`,
        };
        res.render("settings/index", { user: viewUser });
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
          user.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          };
          console.log(req.file.buffer);
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
