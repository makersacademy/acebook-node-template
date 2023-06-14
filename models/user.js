const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate(value) {
      if(value.length < 8) {
        throw new Error("Passwords is too short. At least 8 characters.")
      }
    }}
});

UserSchema.pre('save', async function (next) {
  console.log("password: ", this)
  const user = this;
  if (user.isModified('password')) {
    console.log('Hashing password...');
    user.password = await bcrypt.hash(user.password, 8);
    console.log('Hashed password:', user.password);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);


