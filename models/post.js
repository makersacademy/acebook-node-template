var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({ 
  message: String,},
  { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } 
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;


//   { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
// );