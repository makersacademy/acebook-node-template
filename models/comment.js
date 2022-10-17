const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
