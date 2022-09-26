const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  //_id: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
