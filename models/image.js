const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: {
      data: Buffer,
      contentType: String
  },
  imgPath: String,
  imgName: String,
  comments: [{
    type: Object,
    }],
});
const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;