const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  message: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  likes: Number,
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  required: ["message", "user"]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


