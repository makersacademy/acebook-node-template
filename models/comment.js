const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  //adds column to database table
  author_id: String,
  author_name: String,
  message: String,
  date: String,
});
// }, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
