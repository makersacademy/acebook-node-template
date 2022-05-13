const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
