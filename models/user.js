const mongoose = require("mongoose");
// const imagePath = 'uploads/profileimage'
const imagePath = 'uploads/images'
const path = require('path')

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  bio: {
    type: String,
    default: "I have not written a bio yet",
    required: false
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  image: {
    type: String,
    default: 'download.png'
  }
});

UserSchema.virtual('imagePath').get(function() {
  if (this.image != null) {
    return path.join('/', imagePath, this.image)
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;

module.exports.imagePath = imagePath;