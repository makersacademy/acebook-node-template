const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friendship: { type: Boolean, default: null },
});

FriendSchema.index({ requester: 1, recipient: 1 }, { unique: true });

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
