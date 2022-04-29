const mongoose = require("mongoose"); 

const commentSchema = new mongoose.Schema({
  postId: {
      type: String
  },
  username: {
      type: String,
  },
  content: {
          type: String,
          required: true,
      },
  createdAt: {
          type: Date,
          required: true,
          default: () => new Date(),
          immutable: true,
      },
});

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;