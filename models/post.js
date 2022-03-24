const mongoose = require('mongoose')
const TimeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en.json')
TimeAgo.addDefaultLocale(en)

const PostSchema = new mongoose.Schema(
  {
    message: String,
    userObjectId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    likes: Array,
    comments: [{
      message: String,
      commenterId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      }
    }],
    createdOnPretty: String
  },
  { timestamps: true }
)

PostSchema.methods.formatDate = function(dateProperty) {
  const timeAgo = new TimeAgo('en-US')
  const prettyDate =  timeAgo.format(Date.parse(dateProperty), 'twitter')
  return prettyDate;
}

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
