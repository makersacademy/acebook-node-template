const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  image:  {
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
