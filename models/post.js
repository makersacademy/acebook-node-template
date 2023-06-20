const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const PostSchema = new mongoose.Schema({
  username: {type: String},
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: {type: String, maxLength: 256},
  like: [{
    likeAuthor: { type: String },
  }],
  // an list of comment objects containing the author, username, content and date
  // comment: [{
  //   author: { type: String },
  //   username: { type: String },
  //   content: { type: String, maxLength: 200 },
  //   date: { type: Date, default: () => Date.now() },
  // }],
  //date of the original post
  date: { type: Date, default: () => Date.now() },
}, { timestamps: true } );

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

