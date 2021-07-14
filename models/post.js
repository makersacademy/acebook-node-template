var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  _id: String,
  message: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
