const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: [mongoose.Schema.Types.ObjectId]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;