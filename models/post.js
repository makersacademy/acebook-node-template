const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
<<<<<<< HEAD
  { message: String,
    likes: Array},
=======
  { message: String, comments: Array },
>>>>>>> origin/main
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
