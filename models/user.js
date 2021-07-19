var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    min: [4, 'Too few characters'],
    max: 28,
    required: true, index: { unique: true }
  },
  email: {
    type: String,
    required: true, index: { unique: true } 
  },
  password: {
    type: String,
    min: [5, 'Too few characters'],
    required: true 
  },

});

var User = mongoose.model('User', UserSchema);

module.exports = User;
