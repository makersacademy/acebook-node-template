const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: String,
    authorIcon: String,
    authorID: String,
    message: {
      type: String,
      maxLength: 500,
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
      default: [],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    gifUrl: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
