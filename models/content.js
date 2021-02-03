var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  post: String,
  author: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
