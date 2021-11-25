var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String, 
  user_id: String,
  user_name: String,
  },
  { timestamps: true }
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
