const session = require("express-session");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  username: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
