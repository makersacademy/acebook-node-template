const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userID: String,
  postID: String,
  });

LikeSchema.statics.countAllLikes = function(cb) {
  const aggregatorOpts = [
    {
      $group: {
          _id: '$postID',
          count: { $sum: 1 }
      }
    }]
  return mongoose.model('Like').aggregate(aggregatorOpts, cb);
};

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
