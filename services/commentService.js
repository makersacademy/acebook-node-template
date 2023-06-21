const Comment = require("../models/comment");

exports.getCommentsByPostId = async (postId) => {
  const comments = await Comment.find(
    { post: postId },
    { _id: 1, content: 1, user: 1 }
  ).exec();

  return comments;
};
