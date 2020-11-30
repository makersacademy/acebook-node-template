var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  Gender: String,
  Birthday: String,
  About: String,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
