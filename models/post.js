const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time_posted: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments_counter: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
