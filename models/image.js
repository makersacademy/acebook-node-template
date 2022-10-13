const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  data: {
    data: Buffer,
    contentType: String,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
