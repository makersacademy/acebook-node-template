const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  username: String,
  dateAndTime: Date,
  likes: Array,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
