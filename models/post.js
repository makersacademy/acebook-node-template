var mongoose = require('mongoose');
var PostSchema = require('./postsSchema');

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
