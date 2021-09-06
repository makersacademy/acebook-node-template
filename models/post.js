var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({ 
  message: String,
  likes: { type: Number, default: 0 }
},
  { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } 
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
