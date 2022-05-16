const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  first_name: String,
  last_name: String,
  gender: String,
  home_town: String,
  bio: String,
  dob: Date,
});

const User = mongoose.model("User", UserSchema);

UserSchema.plugin(uniqueValidator);

module.exports = User;
