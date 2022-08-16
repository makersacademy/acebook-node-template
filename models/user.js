const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  description: { type: String, required: false },
  photo: { type: Buffer, required: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
