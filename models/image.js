const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
      data: Buffer,
      contentType: String
  },
  imgPath: String,
  imgName: String
});
const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;