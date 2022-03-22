const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  surName: String,
  bio: {type: String, default: "This is a default bio"},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
