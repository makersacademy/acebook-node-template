const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
<<<<<<< HEAD
  message: String,
  likes: Number,
=======
  message: {type: String, required: true},
  createdAt: { type: Date, default: Date.now()},
>>>>>>> main
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
