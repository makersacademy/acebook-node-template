var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'},
  body: String,
  datePosted: Date,
  name: String,
  comments: [{body: String, timePosted: Date, commentUserID: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}}]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
