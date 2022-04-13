const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: {type: Date, default: Date.now},
  comments: {type:Array, default: []},
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
