var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  postLikeCounter: {type: Number, default: 0},
  postDislikeCounter: {type: Number, default: 0},
  comments: []
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
