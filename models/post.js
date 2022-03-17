const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String, 
  createdAt: {
    type: Date,  
    default: Date.now()
  },
  comments: [],
  likes: 0
});

const Post = mongoose.model("Post", PostSchema);



module.exports = Post;


