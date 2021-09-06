var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({ 
  message: String,},
  { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } 
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;