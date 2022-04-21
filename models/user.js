const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: () => {return this.email != ""},
  },
  
  password: {
    type: String,
    required: () => {return this.password != ""},
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
