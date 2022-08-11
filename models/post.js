const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  message: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: false},
  likes: {type: Number, required: false},
  timePosted: {type: Date, required: false},
  comments: { type: Array, default: [] }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
