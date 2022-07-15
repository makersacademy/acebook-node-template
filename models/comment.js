const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    commentMessage: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
