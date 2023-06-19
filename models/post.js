const mongoose = require("mongoose");
// const Schema = require("mongoose").Schema;

const PostSchema = new mongoose.Schema({
  username: {type: String},
  // userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: {type: String, maxLength: 256},
  likes: {type: Number},
  // currentDate: {type: String}
}, { timestamps: true } );

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
