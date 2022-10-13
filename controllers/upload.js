const Image = require("../models/image");

const UploadController = {
  Index: (req, res) => {
    Image.find((err, images) => {
      if (err) {
        throw err;
      }
      console.log(images[0].data.data.toString("base64")); //logs intended string
      res.render("upload/index", { images: images });
    });
  },
  // UploadImage: (req, res) => {
  //   const image = new Image(req.body);
  //   console.log(req.body);
  //   image.save((err) => {
  //     if (err) {
  //       throw err;
  //     }

  //     res.status(201).redirect("/upload");
  //   });
  // },
};

module.exports = UploadController;
