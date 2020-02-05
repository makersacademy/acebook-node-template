var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;


// let user = {
//   name: "Aaron",
//   age: 35,
//   hobbies: {
//     sports: ['Tennis', 'Hocky'],
//     computers: ['C++', 'Other things'],

//   }
  
// }

// user.hobbies.sports