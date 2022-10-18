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
    user_id: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
