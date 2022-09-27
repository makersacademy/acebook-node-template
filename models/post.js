const session = require("express-session");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  username: String,
  likes: Number,
  // users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
