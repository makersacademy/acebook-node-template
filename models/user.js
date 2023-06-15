const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

let User;
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
          const user = await this.model('User').findOne({ email: value })
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
  username: 
    { type: String, 
      required: true, 
      unique: true, 
      trim: true,
      maxlength: 25,
      validate: [
        // {
        //   validator: function (value) {
        //     return validator.isEmail(value);
        //   },
        //   message: "Email is invalid",
        // },
        {
          validator: async function (value) {
            const user = await this.model('User').findOne({ username: value })
            return !user; // Return false if user with same email already exists
          },
          message: "Username is already in use",
        },
      ],
    }, 
  image: { 
    type: String, 
    default: '' 
  },
});

UserSchema.pre('save', async function (next) {
  // Pre-save hook logic
  if (!User) {
    User = mongoose.model('User'); // Assign User model if not defined
  }
  const user = this;
  if (user.isModified('password')) {
    // Hash password logic
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);


