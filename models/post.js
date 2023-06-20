const mongoose = require("mongoose");



const PostSchema = new mongoose.Schema({
  message: String,
  image: {
    data: Buffer,
    contentType: String,
  },

  timestamp: { type : Date, default: Date.now },
  postAuthor: Object,
  likes: Array,
  comments: {
    type: [
      {
        message: String,
        author: String,
        commentTime: { type : Date, default: Date.now },
      }
    ],
    default: []
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
