const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: {type: String, required: true},
  post: {type: Schema.Types.ObjectId, ref: 'Post', required:false}
});

// const Comment = mongoose.model('Comment', CommentSchema);

// module.exports = Comment