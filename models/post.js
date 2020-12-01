var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  image: {
  type: String
  },
  message: {
  type: String
  },
  author: {
  type: String
  },
  description: {
  type: String
  },
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
