const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  userId: String,
  likes_count: Number,
  postImage: {
    data: Buffer,
    contentType: String,
  },
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
