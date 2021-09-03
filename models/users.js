var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  // email: {type: mongoose.SchemaTypes.Email, required: true},
  // password: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;