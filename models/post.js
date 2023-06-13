const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const PostSchema = new mongoose.Schema({
  message: String,
  image_url: String,
  timestamp: { type : Date, default: Date.now },
  author: Object,
  likes: Array,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
