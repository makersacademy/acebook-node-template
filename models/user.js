var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  surname: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
