const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    match: /^[A-Za-z ]+$/,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    match: /^[A-Za-z ]+$/,
    required: true,
    maxLength: 20,
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
  friends: {
    type: [mongoose.Types.ObjectId], // each friend is represented by their ObjectId
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
