const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  firstname: String,
  createdAt: Date,
  likes: Number,
  comments: []
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
