const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
