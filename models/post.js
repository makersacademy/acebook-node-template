const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
