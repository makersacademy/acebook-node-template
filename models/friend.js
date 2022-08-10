const mongoose = require("mongoose");
// const UserSchema = require("./user").schema;
const Schema = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
  requester: Schema.Types.ObjectId,
  recipient: Schema.Types.ObjectId,
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = Friend;
