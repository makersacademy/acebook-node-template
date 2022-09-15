const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    maxLength: 200,
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
