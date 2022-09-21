const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: String,
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
