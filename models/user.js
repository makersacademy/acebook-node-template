const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    match: /^[A-Za-z\u00C0-\u00FF\-'. ]+$/,
    required: true,
    minLength: [1, 'First name must have at least 1 character'],
    maxLength: [20, 'First name cannot exceed 20 characters'],
    validate: [{
      validator: function(value) {
        // Count the number of letters (including accented ones).
        const letterCount = (value.match(/[A-Za-z\u00C0-\u00FF]/g) || []).length;
        return letterCount >= 2 && letterCount <= 20;
      },
      message: 'First name must have between 2 and 20 letters (including accented ones)'
    }]
  },
  lastName: {
    type: String,
    match: /^[A-Za-z\u00C0-\u00FF\-'. ]+$/,
    required: true,
    minLength: [1, 'Last name must have at least 1 character'],
    maxLength: [20, 'Last name cannot exceed 20 characters'],
    validate: [{
      validator: function(value) {
        // Count the number of letters (including accented ones).
        const letterCount = (value.match(/[A-Za-z\u00C0-\u00FF]/g) || []).length;
        return letterCount >= 2 && letterCount <= 20;
      },
      message: 'Last name must have between 2 and 20 letters (including accented ones)'
    }]
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(v);
      },
      message:
        "Password is not valid. Passwords must contain at least 8 characters, a number and a special character",
    },
  },
  nemesis: {
    type: mongoose.Types.ObjectId, ref: 'User' //nemesis is represented by their id number
  },
  icon: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
