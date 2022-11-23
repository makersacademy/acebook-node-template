const mongoose = require('mongoose')
const User = require('../models/user')

const PostSchema = new mongoose.Schema({
  message: String,
  comments: {
    comment: { type: String },
    commenter: { type: String }
  },
  likes: { type: Number, default: 0 },
  likers: {type: Array, default: []},
  // connects to id from User schema
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
},
{ timestamps: true }

)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
