var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: 1,
    required: true
  }, 
  password: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
