const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: String,
  postId: String,
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
