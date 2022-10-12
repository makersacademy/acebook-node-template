const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {type: String, unique: false, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, unique: false, required: true},
  photo_link: {type: String}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
