const mongoose = require("mongoose");
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
  comment: String,
  post: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  user: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{ timestamps: true });


CommentSchema.virtual('timeFormat').get(function () {
  const formatedDate = moment(this.createdAt).format('DD MMMM')
  const formatedTime = moment(this.createdAt).format('HH:MM')
  const test = moment(this.createdAt).fromNow()
  return test
  //return `${formatedDate} at ${formatedTime}`
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

