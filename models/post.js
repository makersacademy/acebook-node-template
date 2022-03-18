const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  message: String, 
  createdAt: {
    type: Date,  
    default: Date.now()
  },
  comments: [],
  likes: 0,
  user: String,
});

const Post = mongoose.model("Post", PostSchema);



module.exports = Post;


