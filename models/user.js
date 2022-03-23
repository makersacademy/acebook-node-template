const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  surName: String,
  title: {type: String, default: "Please add your title e.g. Mr, Ms etc."},
  pronouns: {type: String, default: "Please add your pronouns"},
  bio: {type: String, default: "Please add your bio"},
  location: {type: String, default: "Please add your location"}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
