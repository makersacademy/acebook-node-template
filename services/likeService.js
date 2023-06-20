const Like = require("../models/like");

exports.getLikesCount = async (postId) => {
  const likesCount = await Like.countDocuments({
    post: postId,
    liked: true,
  }).exec();

  return likesCount;
};

exports.getLikesByPostId = async (postId) => {
  const likes = await Like.find({
    post: postId,
    liked: true,
  })
    .populate({
      path: "user",
      select: "username",
    })
    .exec();

  return likes;
};
