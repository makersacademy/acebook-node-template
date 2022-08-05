const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: Number,
}, 

{ timestamps: true });


// { like: Number });

// const likeSchema = new mongoose.Schema({
//   timestamp : Number,
//   photo : {type: Schema.Types.ObjectId, ref: 'photo'},
//   user : {type: Schema.Types.ObjectId, ref: 'user'}
// });

// const happy = mongoose.model("Likes", likeSchema)
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
