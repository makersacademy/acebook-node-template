// Step 3 - this is the code for ./models.js

var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = new mongoose.model("Image", ImageSchema);
module.exports = Image;
