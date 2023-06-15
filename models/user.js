const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  posts: [
    {
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;


// need to add username to the schema