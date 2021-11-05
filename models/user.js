var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

var User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
