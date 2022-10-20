const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  requests: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  }],

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
