const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  time: { type: Date, default: Date.now }
});


UserSchema.plugin(uniqueValidator);

const validatorTest = UserSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UserSchema);

console.log(validatorTest.errors)
console.log(User)

module.exports = User;
