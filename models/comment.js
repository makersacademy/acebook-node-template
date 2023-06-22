const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostID",
    required: true,
  },
  user: {
    type: String,
    ref: "Username",
    required: true,
  },
  content: {
    type: String,
    ref: "CommentContent",
    required: [true, "Comment is required"],
    validate: [
      {
        validator: function lengthValidator(content) {
          return content.length < 100;
        },
        message: "Comment cannot be longer than 100 characters",
      },
      {
        validator: function emptyValidator(content) {
          return content.trim().length > 0;
        },
        message: "Comment cannot be empty",
      },
    ],
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
