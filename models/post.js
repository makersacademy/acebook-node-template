const mongoose = require("mongoose");
const Comment = require("./comment");

const PostSchema = new mongoose.Schema({
  author: String,
  message: {
    type: String,
    maxLength: 500,
    required: true
  },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;