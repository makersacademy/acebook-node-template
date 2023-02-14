const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: { type: Number, default: 0 },
  liked_by: [],
  date: Date,
  user_id: String,
  picture: { type: String, default: "none" },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

