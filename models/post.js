const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  firstname: String,
  likes: Number,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
