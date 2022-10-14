const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    content: String,
    user: Object

    // post: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Post",
    // },
  },

  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
