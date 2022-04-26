const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  requester_id: {type: String, required: true},
  receiver_id: {type: String, required: true},
  status: {type: String, required: true},
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;