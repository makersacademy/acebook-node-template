const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema(
  {
    message: String,

    remarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: Array,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photo: {
      data: Buffer,
      contentType: String,
      code: String,
      photoExists: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
