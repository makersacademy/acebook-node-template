var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  date: String,
  userId: String,
});

var Post = mongoose.model('post', PostSchema);

module.exports = Post;
