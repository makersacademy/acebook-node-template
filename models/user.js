const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");


const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: false },
  photo: { type: Buffer, required: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
