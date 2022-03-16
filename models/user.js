const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  name: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
