var mongoose = require('mongoose');
var CommentSchema = require('./commentsSchema');

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
