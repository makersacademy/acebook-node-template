const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  userId: String,
  likes_count: Number,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
