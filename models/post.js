const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  userId: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
