var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  comment: String,
  postID: String
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
