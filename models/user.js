const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  requests: Array,
  friends: Array,
  photo:
    {
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
