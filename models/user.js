var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: { 
    type: String,
    required: [true, 'Email cannot be blank'],
  },
  password: {
    type: String, 
    required: [true, 'Password cannot be blank']
  },
  username: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  bio: { 
    type: String,
    default: "I have not written a bio yet",
    required: false
  },
})

var User = mongoose.model('User', UserSchema);

module.exports = User; 
