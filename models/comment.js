const mongoose = require("mongoose");
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
  comment: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  post: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  user: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{ timestamps: true });


CommentSchema.virtual('timeFormat').get(function () {
  const today = new Date()
  
  if (moment(this.createdAt).format('DD MMMM') === moment(today).format("DD MMMM")) {
    return moment(this.createdAt).fromNow()
  }
  else{
    const formatedDate = moment(this.createdAt).format('DD MMMM')
    const formatedTime = moment(this.createdAt).format('HH:mm')
    return `${formatedDate} at ${formatedTime}`
  }
})

CommentSchema.virtual('commentLikesArray').get(function () {
  const commentLikesArray = []
  try {
    this.likes.forEach((likes) => {
      commentLikesArray.push(String(likes._id))
    })
    return commentLikesArray
  } catch (error) {
    console.error(error);

  }


});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

