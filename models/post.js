const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  username: String,

  likes: { 
    type: [String], 
  },

  image_url: String,

  profilePic:{ 
    type: String,
    default: "/images/Giraffe.png"
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
