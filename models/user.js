const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
    code: String,
    photoExists: Boolean,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
