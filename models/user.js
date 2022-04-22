const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: () => {
      return this.username != "";
    },
  },

  email: {
    type: String,
    required: () => {
      return this.email != "";
    },
  },

  password: {
    type: String,
    required: () => {
      return this.password != "";
    },
  },

  profilePicture: {
    type: String,
    default: 'default.png',
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
