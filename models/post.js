const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const PostSchema = new mongoose.Schema({
  content: { type: String, maxLength: 200, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  like: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comment: new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, maxLength: 200 },
    date: { type: Date, default: () => Date.now() },
  }),
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
