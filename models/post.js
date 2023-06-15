const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  message: String,
  image_url: String,
  timestamp: { type : Date, default: Date.now },
  postAuthor: Object,
  likes: Array,
  comments: {
    type: [
      {
        message: String,
        author: String
      }
    ],
    default: []
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
