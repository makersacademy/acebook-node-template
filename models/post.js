const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  { name: String, 
    message: String, 
    likes: Array,
    comments: Array, 
    photo_link: String,
    date_string: String 
  },
  { timestamps: true}
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
