const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  profilePic:{ 
    type: String,
    default: "/images/Giraffe.png"
  }
});


const User = mongoose.model("User", UserSchema);
module.exports = User;
