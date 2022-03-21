const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: Number,
  posted_by: String,
  comments: Array,

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
