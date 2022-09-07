const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  friends: Array,
});
// methods TBC below to add user to Friends List without masses of code

// UserSchema.methods.addUserToFriendsList = (user, callback) => {
//   console.log("hello");
//   console.log(this);
//   // this.friends = this.friends.concat(user);
//   callback(this.friends);
// };

// UserSchema.methods.addUserToFriendsList = function (user, callback) {
//   this.friends;
//   callback(user);
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
