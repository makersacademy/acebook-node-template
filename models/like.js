const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userID: String,
  postID: String,
  });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
