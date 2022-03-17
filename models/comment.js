const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  // user: 
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

// { timestamps: true });