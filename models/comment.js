const mongoose = require('mongoose');

const date = new Date().toLocaleString();

const CommentSchema = new mongoose.Schema({
  date: { type: Date, default: date },
  content: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
