const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  post: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  user: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{ timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

