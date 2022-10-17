const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    likes: Array,
    comments: Array,
    photo_link: String,
    image: String,
    date_string: String,
    fileStorage: Array,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
