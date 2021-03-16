var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  user: String,
  comment: {type: String, trim: true},
  created: {type: Date, default: Date.now(), select: false},
  post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  user: String
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
