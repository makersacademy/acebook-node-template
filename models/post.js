var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  owner: String,
  date: Date
}, {
  timestamps: true,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
