var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: [true, 'Username cannot be blank']
  },
  password: {
    type: String, 
    required: [true, 'Password cannot be blank']
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = User; 
