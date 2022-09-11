const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const PostSchema = new mongoose.Schema({
  content: { type: String, maxLength: 200, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  username: { type: String },
  like: [{
    likeAuthor: { type: String },
  }],
  comment: [{
    author: { type: String },
    username: { type: String },
    content: { type: String, maxLength: 200 },
    date: { type: Date, default: () => Date.now() },
  }],
  date: { type: Date, default: () => Date.now() },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;