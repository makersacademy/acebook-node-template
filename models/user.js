const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
