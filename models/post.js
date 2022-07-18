const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: String,
  likes: {
    count: {type: Number, default: 0},  
    emails: {type: Array}
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
