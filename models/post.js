var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
}, {
  timestamps: { createdAt: true, updatedAt: false}
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
