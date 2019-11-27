var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  email: String,
  newPassword: String,
  dob: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;