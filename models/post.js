const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},
  likes: { type: Number, default: 0},
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
