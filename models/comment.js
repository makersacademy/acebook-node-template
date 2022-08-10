const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
  comment: String,
  post: {type: Schema.Types.ObjectId, ref: "Post"},
  required: ["comment", "post"]
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;