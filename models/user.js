var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;