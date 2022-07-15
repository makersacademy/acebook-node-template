const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postID: { type: mongoose.SchemaTypes.ObjectId, ref: "Post", required: true },
  date: Date,
  comment: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;