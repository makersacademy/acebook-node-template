const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment",}],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
