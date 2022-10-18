const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: String,
  user_id: mongoose.Schema.Types.ObjectId, 
  post_id: mongoose.Schema.Types.ObjectId
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
