var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  postedBy: String,
  likes: Number
  },
  { timestamps: true},
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
