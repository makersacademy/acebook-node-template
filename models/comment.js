var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  comment: String,
  post: String,
  user: String,
  date: { type: Date, default: Date.now },
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;