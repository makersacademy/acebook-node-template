const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: () => {return this.message != ""},
  },

  author: {
    type: String,
    required: () => {return this.author != ""},
  },

  photo: {
    type: String,
  },

  likers: {
    type: Array,
  },

  like_count: {
    type: Number,
    default: 0
  }
});

const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
