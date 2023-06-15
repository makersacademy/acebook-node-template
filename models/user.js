const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
      validate:  [
      {
        validator: function lengthValidator (value) {
          return value.length >= 8;
        },
        message: "Password is too short. At least 8 characters.",
      },
    ],
  },
  username: 
    { type: String, 
      required: true, 
      unique: true, 
      trim: true,
      maxlength: 25
    }, 
  image: { 
    type: String, 
    default: '' 
  },
});

userSchema.pre('save', async function (next) {
  // Pre-save hook logic
  // if (!User) {
  //   User = mongoose.model('User'); // Assign User model if not defined
  // }
  const user = this;
  if (user.isModified('password')) {
    // Hash password logic
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);


