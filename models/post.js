const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  // dateTimeCreated
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
