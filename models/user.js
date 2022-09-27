const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,
  image: {
    data: Buffer,
    contentType: String
  },
  requests: {
    sent: [ String ],
    received: [ String ]
  },
  friends: [ String ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
