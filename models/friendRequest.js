var mongoose = require('mongoose');

var FriendRequestSchema = new mongoose.Schema({
    requester:  {type: mongoose.Schema.Types.ObjectId},
    recipient: {type: mongoose.Schema.Types.ObjectId},
    status: Number
});

var FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema);

module.exports = FriendRequest;