var mongoose = require('mongoose');

var now = new Date ();
var timestamp = now.getHours() + ":" + now.getMinutes() + ' ' + now.getDate()+"/"+(now.getMonth()+1) + '/' + now.getFullYear();
var PostSchema = new mongoose.Schema({
  message: String,
  time : {
    type: String,
    default: timestamp
  },
  postedby: String,
  comments: {
    type: Array,
  },
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
