const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  message: String,
  posterID: String,
  posterName: String,
  comments: Array,
  likes: Number,
  },
  { timestamps: true},
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;