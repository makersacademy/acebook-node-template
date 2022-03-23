const mongoose = require("mongoose");
const moment = require('moment');

const PostSchema = new mongoose.Schema({
  message: String,
  likes: { type: Number, default: 0 },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  userLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  user: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{ timestamps: true });

PostSchema.virtual('timeFormat').get(function () {
  const today = new Date()
  console.log(today)
  console.log(moment(this.createdAt).isAfter(today))
  if (moment(this.createdAt).isAfter(today)) {
    return moment(this.createdAt).fromNow()
  }
  else{
    const formatedDate = moment(this.createdAt).format('DD MMMM')
    const formatedTime = moment(this.createdAt).format('HH:MM')
    return `${formatedDate} at ${formatedTime}`
  }

})


PostSchema.virtual('likesArray').get(function () {
  const likesArray = []
  this.userLikes.forEach((likes) => {
    likesArray.push(String(likes._id))
  })
  return likesArray
});

PostSchema.virtual('count').get(function () {
  return String(this.userLikes.length)
})


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
