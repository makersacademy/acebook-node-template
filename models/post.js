const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},
  {timestamps: true},
  
);
PostSchema.virtual('url').get(function(){
  return '/posts/' + this._id
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
