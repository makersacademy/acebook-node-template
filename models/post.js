const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const PostSchema = new mongoose.Schema({
  _id: String,

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
});

const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
