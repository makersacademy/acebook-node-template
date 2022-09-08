const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: { String, maxLength: 200 },
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  }

  // comment: [
  //   {
  //     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //     message: { type: String, maxLength: 200 },
  //     date: { type: Date, default: () => Date.now() },
  //   },
  // ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
