const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  message: {
    type: String,
    required: () => {return this.message != ""},
  }
});

const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
