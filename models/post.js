const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author_id: String,
  author_name: String,
  message: String,
  date: String,
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
