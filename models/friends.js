const mongoose = require("mongoose");

const friendsSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: Number,
        enums: [
            0,    //'pending',
            1,    //'friends',
        ]
    }
}, { timestamps: true })

const Friends = mongoose.model("Friends", FriendsSchema);

module.exports = Friends;
