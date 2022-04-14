const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  url: String,
  name: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
