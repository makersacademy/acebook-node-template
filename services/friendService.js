const Friend = require("../models/friend");

exports.getFriendshipRequests = async (userId) => {
  return await Friend.find({
    requester: userId,
    friendship: null,
  })
    .populate({ path: "recipient", select: "username" })
    .exec();
};

exports.getPendingFriendships = async (userId) => {
  return await Friend.find({
    recipient: userId,
    friendship: null,
  })
    .populate({ path: "requester", select: "username" })
    .exec();
};

exports.getAcceptedFriendships = async (userId) => {
  return await Friend.find({
    recipient: userId,
    friendship: true,
  })
    .populate({ path: "requester", select: "username" })
    .exec();
};

exports.getExistingFriendship = async (userId, recipientId) => {
  return await Friend.findOne({
    $or: [
      { requester: userId, recipient: recipientId },
      { requester: recipientId, recipient: userId },
    ],
  });
};

exports.createFriendship = async (userId, recipientId) => {
  const friendship = new Friend({
    requester: userId,
    recipient: recipientId,
  });

  await friendship.save();
};

exports.acceptFriendship = async (requesterId, recipientId) => {
  const friendship = await Friend.findOne({
    requester: requesterId,
    recipient: recipientId,
  });

  if (friendship) {
    friendship.friendship = true;
    await friendship.save();
  }

  return friendship;
};

exports.rejectFriendship = async (requesterId, recipientId) => {
  const friendship = await Friend.findOne({
    requester: requesterId,
    recipient: recipientId,
  });

  if (friendship) {
    friendship.friendship = false;
    await friendship.save();
  }

  return friendship;
};
