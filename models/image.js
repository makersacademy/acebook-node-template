// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
