const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  username: String,
  image_url: String
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
