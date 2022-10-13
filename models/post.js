const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema(
  {
    message: String,

    remarks: Array,
    likes: Array,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
