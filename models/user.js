const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  img: String
});

const User = mongoose.model("User", UserSchema);
User.createIndexes();
module.exports = User;
