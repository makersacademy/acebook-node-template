var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema(
  {comment: String,
  post: String,
  user: String,
  },
    {timestamps: true}
);


var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;