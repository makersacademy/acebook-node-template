const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profile_picture: {type: String, default: null},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
