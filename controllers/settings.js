const Image = require("../models/image");
const multer = require("multer");
const upload = multer().single("uploadedImage");
const User = require("../models/user");

const SettingsController = {
  Index: (req, res) => {
    Image.find((err, images) => {
      if (err) {
        throw err;
      }
      const srcStrings = images.map((image) => {
        const string = `data:${
          image.contentType
        };base64,${image.data.data.toString("base64")}`;
        console.log(string);
        return string;
      });
      res.render("settings/index", { images: srcStrings });
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
