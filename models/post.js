const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
  },

  author: {
    type: String,
  },

  photo: {
    type: String,
  },

  likers: {
    type: Array,
  },

  commenters:{
    type: Array,
  }
});

const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
