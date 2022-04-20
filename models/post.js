const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  username: String,
  dateAndTime: Date,
  likes: Array,
  comments: [
    {
      type: mongoose.Schema.Types.Object,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
