const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post_id: String,
  user_id: String,
  message: String,
  date: Date,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

