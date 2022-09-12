const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: { String, maxLength: 200 },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
