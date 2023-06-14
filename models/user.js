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
    validate: [
      {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Email is invalid",
      },
      {
        validator: async function (value) {
          const user = await User.findOne({ email: value });
          return !user; // Return false if user with same email already exists
        },
        message: "Email address is already in use",
      },
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate:  [
      {
        validator: function (value) {
          return value.length >= 8;
        },
        message: "Password is too short. At least 8 characters.",
      },
    ],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 25,
    // validate: [
    //   {
    //     validator: async function (value) {
    //       const user = await User.findOne({ username: value });
    //       return !user; // Return false if user with same username already exists
    //     },
    //     message: "Username is already in use",
    //   },
    // ],
  },
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


