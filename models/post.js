var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  comments:[{comment: String, timePosted: Date}]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
