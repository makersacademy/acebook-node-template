const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  // requester: { type: Schema.Types.ObjectId, ref: 'User' }
  userId: { type: ref: 'User'}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;