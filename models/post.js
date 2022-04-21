const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: [mongoose.Schema.Types.ObjectId],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;