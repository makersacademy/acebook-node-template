const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: String,
  message: String,
  likes: { type: Number, default: 0 },
  comments: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
