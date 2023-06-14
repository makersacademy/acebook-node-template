const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friendship: { type: Boolean, default: null },
});

FriendSchema.index({ user: 1, friend: 1 }, { unique: true });

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
