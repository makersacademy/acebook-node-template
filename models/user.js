const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  surname: String,
  profilePicture: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
