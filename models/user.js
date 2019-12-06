var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  surname: String,
  email: String,
  password: String,
  dob: String,
  friends: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Friend"
  }],
  friendRequests: [{
    type: mongoose.Schema.Types.ObjectId, ref: "FriendRequest"
  }],
});


var User = mongoose.model('User', UserSchema);

module.exports = User;