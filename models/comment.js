var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  comment: String,
  post_id: String,
  user_id: String,
  user_name: String,
  },
  { timestamps: true }
);

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
