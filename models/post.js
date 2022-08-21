const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: String,
  user: String,
  recipient: String,
  likes: {
    count: {type: Number, default: 0},  
    emails: {type: Array}
  },
  comments : { type : Array , "default" : [] },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
