const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }, 
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  // NEED TO CHECK DATA TYPE: 
  image: { type: ?}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
