const mongoose = require("mongoose");
const imagePath = 'uploads/images'
const path = require('path')

const PostSchema = new mongoose.Schema({
  message: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  },
  posted_by: String,
  comments: Array,

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

PostSchema.virtual('imagePath').get(function() {
  if (this.image != null) {
    return path.join('/', imagePath, this.image)
  }
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
module.exports.imagePath = imagePath;
