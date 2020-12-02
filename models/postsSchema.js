var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

  userId: {
    //the _id of user
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  like: {
    type:  Array
  },
  likes:{
    type: Number,
    default: 0
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = PostSchema;
