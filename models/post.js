const session = require("express-session");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  username: String,
  likes: Number,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
