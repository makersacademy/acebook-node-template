var mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image
