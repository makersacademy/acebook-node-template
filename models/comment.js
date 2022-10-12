const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  { message: String, name: String },
  { timestamps: true }
);

const Comment = mongoose.model("Post", CommentSchema);

module.exports = Comment;
