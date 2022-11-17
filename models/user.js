const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  DOB: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User
