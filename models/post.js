const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: ObjectId,
  username: String,
  message: String,
  likes: Number,
  timestamp: Date,
  comments: Array,

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
