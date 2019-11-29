var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  timeDate: Date,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
