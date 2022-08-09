const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  firstname: String,
  likes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
},
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
