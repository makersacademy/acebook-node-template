const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema(
  {
    message: String,
    userId: Schema.Types.ObjectId,
    content: String,
    likes: [Schema.Types.ObjectId],
    comments: [
      new mongoose.Schema(
        { comment: String, userId: Schema.Types.ObjectId },
        { timestamps: true }
      ),
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
