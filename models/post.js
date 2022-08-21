const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment"}],
  likes: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User",}],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

PostSchema.methods.formatDate = function() {
  return this.createdAt.toString().substring(0,10);
}
PostSchema.methods.upperCaseName = function() {

  return this.author.firstName[0].toUpperCase() + this.author.firstName.substring(1);

}





const Post = mongoose.model("Post", PostSchema);

module.exports = Post;