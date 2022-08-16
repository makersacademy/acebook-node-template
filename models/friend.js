const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const FriendsSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: Number,
    enums: [
      0, //'pending',
      1, //'friends',
    ],
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

const Friends = mongoose.model("Friends", FriendsSchema);

module.exports = Friends;
