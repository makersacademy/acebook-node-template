const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    message: String,
    userObjectId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    likes: Array,
    comments: [{
      message: String,
      commenterId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      }
    }],
    createdOnPretty: String
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
