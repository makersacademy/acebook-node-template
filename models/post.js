var mongoose = require('mongoose');

var Schema = mongoose.Schema
var PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  user: String,
  comments:[ { type: Schema.Types.ObjectId, ref: 'Comment' } ]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
