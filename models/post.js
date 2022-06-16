const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [{ user_id: String, message: String }],
  author: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
