const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comment: String,
  userLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  user: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  

},
{ timestamps: true });


PostSchema.virtual('likesArray').get(function () {
  const likesArray = []
  this.userLikes.forEach((likes) => {
    likesArray.push(String(likes._id))
  })
  return likesArray
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
