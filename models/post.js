const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: { type: Number, default: 0 },
  date: { type: Date, default:Date.now }
  // author: {type:String, default:}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
