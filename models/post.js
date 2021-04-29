var mongoose = require('mongoose');

var Schema = mongoose.Schema
var PostSchema = new mongoose.Schema(
  {message: {type: String, required: true},
  author :  { type: Schema.Types.ObjectId, ref: "User"} ,
  comments:[ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
  likes: {type: Number}
  },
  { timestamps: true }
);

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
