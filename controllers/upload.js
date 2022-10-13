const Image = require("../models/image");

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
