const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,

  post_id: {
    type: mongoose.SchemaTypes.ObjectID,
    ref: "Post",
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
