const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};



const PostSchema = new mongoose.Schema({
  message: String } ,
  schemaOptions
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
