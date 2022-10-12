const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  // user_id: //populate - what to define in the schema
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
