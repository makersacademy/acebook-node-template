const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  friends: Array,
  profilePic:{data:Buffer,contentType: String},
})

const User = mongoose.model('User', UserSchema)

module.exports = User
