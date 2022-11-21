const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }],
  userID: { type: String },
  // tags post to its user:author holds objectID of that User.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: { createdAt: true, updatedAt: false } });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
