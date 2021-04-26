var mongoose = require('mongoose');

var Schema = mongoose.Schema
var PostSchema = new mongoose.Schema(
  {message: {type: String, required: true},
  user: String,
  comments:[ { type: Schema.Types.ObjectId, ref: 'Comment' } ]
  },
  { timestamps: true }
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
