const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  requester_id: ,
  receiver_id: ,
  status: ,
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;