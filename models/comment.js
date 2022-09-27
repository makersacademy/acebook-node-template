const session = require("express-session");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  username: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
