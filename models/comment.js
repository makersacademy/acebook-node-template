var mongoose = require('mongoose');
var Schema = mongoose.Schema
var CommentSchema = new mongoose.Schema(
  {comment: String,
  author : { type: Schema.Types.ObjectId, ref: "User"}
  },
    {timestamps: true}
);


var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;