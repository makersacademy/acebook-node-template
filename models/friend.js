const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  requester_email: {type: String, required: true},
  receiver_email: {type: String, required: true},
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;