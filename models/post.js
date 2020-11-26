var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  //uniqueId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  owner: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
