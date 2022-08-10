const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  required: ["email", "password", "firstName", "lastName"]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
