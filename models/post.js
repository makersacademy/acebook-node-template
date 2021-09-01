var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
});

var Post = mongoose.model('Post', PostSchema);
// var RemovePost = mongoose.findOneAndRemove();

module.exports = Post;
// module.exports = RemovePost;
