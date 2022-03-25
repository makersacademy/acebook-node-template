const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  message: String, 
  createdAt: {
    type: Date,  
    default: Date.now()
  },
  comments: [],
  likes: [{
    type: ObjectId,
    ref: "User"
  }],
  user: String,
  userImage:  String,
});

const Post = mongoose.model("Post", PostSchema);



module.exports = Post;

