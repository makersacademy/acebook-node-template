var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  posterID: String,
  posterName: String,
  comments: Array,
  likes: Number,
  datetime: String
  },
  {timestamps:true}
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
