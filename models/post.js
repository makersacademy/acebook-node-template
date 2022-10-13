const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  { name: String, message: String, comments: Array, photo_link: String },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
