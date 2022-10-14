const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentLikes: Array,
  },

  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
