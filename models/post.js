var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  userId: {type: mongoose.Schema.Types.ObjectId}

});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
