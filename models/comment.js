const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postID: { type: mongoose.SchemaTypes.ObjectId, ref: "Post", required: true },
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User",}],
  date: Date,
  comment: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;