const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment",}],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

PostSchema.methods.formatDate = function() {
  return this.createdAt.toString().substring(0,10);
}

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
