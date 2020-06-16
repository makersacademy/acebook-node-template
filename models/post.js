const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};



const PostSchema = new mongoose.Schema({
  message: String,
  likes: Number,
  comments : { type : Array , "default" : [] } } ,
  schemaOptions
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
