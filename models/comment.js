var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    comment: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }, {
    timestamps: { createdAt: true, updatedAt: false}
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;