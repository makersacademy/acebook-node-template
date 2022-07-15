const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: String,
  postLikeCounter: {type: Number, default: 0}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
