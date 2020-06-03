var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  user_id: Number,
  body: String,
  datePosted: Date,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
