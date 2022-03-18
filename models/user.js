const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  image: Object,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;