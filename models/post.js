const mongoose = require('mongoose')
const User = require('../models/user')

const PostSchema = new mongoose.Schema({
  message: String,
  comments: {
    comment: String,
    commenter: String
  },
  likes: { type: Number, default: 0 },
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
},
{ timestamps: true }

);

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
