const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      message: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
      },
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
