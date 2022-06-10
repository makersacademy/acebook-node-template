const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userID: String,
  userName: String,
  message: String,
  comments: Array,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
