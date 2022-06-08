const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  post_id: String,
  likes_array: {type: [Number]},
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;


// console.log
//       [
//         {
//           likes_array: [ 1 ],
//           _id: 62a0beb76dd8c8c9da005527,
//           post_id: '12345',
//           __v: 0
//         },
//         {
//           likes_array: [ 2 ],
//           _id: 62a0beb76dd8c8c9da005528,
//           post_id: '12345',
//           __v: 0
//         }
//       ]


// spec/models/likes.spec.js