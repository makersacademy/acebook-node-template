const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  DOB: String,
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  profile_picture: {
      data: Buffer,
      contentType: String
  },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
