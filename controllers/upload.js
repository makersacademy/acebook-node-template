const Image = require("../models/image");
const multer = require("multer");
const upload = multer().single("uploadedImage");

const UploadController = {
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
      res.render("upload/index", { images: srcStrings });
    });
  },
  UploadImage: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newImage = new Image({
          name: req.body.textNote,
          data: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          },
          contentType: req.file.mimetype,
        });
        console.log(req.file);
        newImage
          .save()
          .then(() => res.redirect("/upload"))
          .catch((err) => console.log(err));
      }
    });
  },
};

module.exports = UploadController;
