const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  surname: String,
  // profilePic:
  //   {
  //       data: Buffer,
  //       contentType: String
  //   }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
