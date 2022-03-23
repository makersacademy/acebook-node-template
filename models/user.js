const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  bio: String,

  sent_requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pending_friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
