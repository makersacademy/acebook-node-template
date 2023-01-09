const mongoose = require("mongoose")

const FriendsSchema = new mongoose.Schema({
    user1:{type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true},
    user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
})

const Friends = mongoose.Model("Friends", FriendsSchema);

module.exports = Friends;