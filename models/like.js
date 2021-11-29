const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userID: String,
  postID: String,
  });

const Like = mongoose.model('Like', LikeSchema);

Like.prototype.countAllLikes = function() {
  Like.aggregate().
  group('postID').
  count().
  exec();
};
module.exports = Like;
