const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userID: String,
  userName: String,
  message: String,
  comments: Array,
  date: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
