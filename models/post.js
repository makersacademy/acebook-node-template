var mongoose = require('mongoose');

var Schema = mongoose.Schema
var PostSchema = new mongoose.Schema(
  {message: {type: String, required: true},
  author :  { type: Schema.Types.ObjectId, ref: "User", required: true } ,
  comments:[ { type: Schema.Types.ObjectId, ref: 'Comment' } ]
  },
  { timestamps: true }
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
