const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  surName: String,
  bio: {type: String, default: "Please update your bio"},
  location: {type: String, default: "Please update your location"}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
