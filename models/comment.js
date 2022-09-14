const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: String,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  time_posted: String,
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;