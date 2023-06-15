const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: String,
  message: String,
  likes: { type: Number, default: 0 },
  currentDate: { type: String }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
