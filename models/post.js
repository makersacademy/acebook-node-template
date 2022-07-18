const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment"}],
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
PostSchema.methods.showUserName = function() {
  return this.author;

}

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;