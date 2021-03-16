var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
  message: String,
  date: String,
  created_at: {type: Date, default: Date.now},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  likes: Number,
  user: String 
});


var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
