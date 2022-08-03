const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,

}, 

{ timestamps: true });

const User = mongoose.model("User", UserSchema);
console.log(User.createdAt)
console.log(User)

module.exports = User;
