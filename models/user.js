const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String,  unique: true },
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  bio: String,
  location: String,
  age: Number,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;