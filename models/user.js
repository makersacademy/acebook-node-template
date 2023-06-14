const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, select: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
