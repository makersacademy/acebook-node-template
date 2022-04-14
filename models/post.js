const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: {type: Date, default: Date.now},
  email: {type: String},
  profPic: {type: String, default: 'https://drive.google.com/uc?export=view&id=1al2UBXc-gaPMpop8z_WQR3lAWsuEBrYR'},
  userName: String,
  likes: {type: Number, default: 0}
});
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
