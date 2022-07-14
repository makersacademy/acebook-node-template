const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentmessage: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
