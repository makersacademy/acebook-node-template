const mongoose = require("mongoose");

 
const PostSchema = new mongoose.Schema({
  message: {type:String, required:true},
  author: {type:String, required:true}, //required true means it is needed when a post is created, we can then pass an objecrt including user info to the new post initialisation.
  likes: { type: Number, default: 0 },
  loves: { type: Number, default: 0 },
  date: { type: Date, default:Date.now },
  comments: [{
    date: { type: Date, default: Date.now },
    comment: {type: String},
    user: {type:String}
}]
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
