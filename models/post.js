var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});


var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
