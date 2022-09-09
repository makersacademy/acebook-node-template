const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: { String, maxLength: 200 },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const CommentSchema = new mongoose.Schema({
  // postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, maxLength: 200 },
});

const Comment = mongoose.model("Comment", CommentSchema);
const Post = mongoose.model("Post", PostSchema);

module.exports = { Post, Comment };
