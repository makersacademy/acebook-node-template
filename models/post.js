const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  likes: {
    count: { type: Number, default: 0 },
    emails: { type: Array },
    icon: { type: String, default: 'fa-regular fa-heart' },
  },
  comments: { type: Array, default: [] },
  timePosted: {
    type: String,
    default: function () {
      const date = new Date();
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
