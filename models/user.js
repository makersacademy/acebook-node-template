const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    default: "",
  },

  profilePic: {
    type: String,
    default: "https://live.staticflickr.com/8005/7124089493_53ae788cb3_b.jpg",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
