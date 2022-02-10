var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: Object,
  postedBy: Object
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
