// Step 3 - this is the code for ./models.js

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
  },
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
