const mongoose = require('mongoose')
// const User = require("../models/user")

const PostSchema = new mongoose.Schema(
  {
    message: String,
    userObjectId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    likes: Array
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
