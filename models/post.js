var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  user: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
