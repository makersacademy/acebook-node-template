const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
