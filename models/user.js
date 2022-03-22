const mongoose = require("mongoose");
const imagePath = 'uploads/profileimage'
const path = require('path')

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  bio: String,
  image: String,
});

UserSchema.virtual('imagePath').get(function() {
  if (this.image != null) {
    return path.join('/', imagePath, this.image)
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;

module.exports.imagePath = imagePath;