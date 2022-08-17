const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  image: { type: String, data: Buffer },
  signupDate: {
    type: Date,
    default: () => Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
