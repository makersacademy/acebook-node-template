const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  DOB: String,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
})

const User = mongoose.model('User', UserSchema)

module.exports = User
