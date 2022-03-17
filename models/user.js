const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;