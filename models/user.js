var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  Gender: String,
  Birthday: String,
  'About-me': String,
  Status: Boolean,
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
