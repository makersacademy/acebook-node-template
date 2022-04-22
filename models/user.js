const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  profilePic: String,
  sentRequests: [String],
  receivedRequests: [String],
  friendsList: [String],
  totalRequest: {type: Number, default:0}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
